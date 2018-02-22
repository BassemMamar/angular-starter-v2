import { Injectable, Inject } from '@angular/core';
import { LocationStrategy } from '@angular/common';

import { UserManager, User, Log, UserManagerSettings, OidcClient } from 'oidc-client';
import { CommunicationService } from '../../services/communication/communication.service';
import { LoggerService } from '../../base/logger/logger.service';
import { AuthClients } from '../model/auth-clients';
import { HttpErrorHandlingService } from '../../services/http-error-handling/http-error-handling.service';

@Injectable()
export class OidcService {

    private businessAccountManagementClient: UserManager;
    private frontendShellClient: UserManager;
    private currentClient: UserManager;
    private businessAccountManagementSettings: any = {}; // UserManagerSettings
    private frontendShellSettings: any = {};

    constructor(
        private logger: LoggerService,
        private communicationService: CommunicationService,
        private locationStrategy: LocationStrategy,
        private httpErrorHandlingService: HttpErrorHandlingService
    ) {
        // ToDo later uncommet this
        //  Log.logger = this.logger;
        Log.level = Log.WARN;
    }

    signin(authClient, redirectUrl): Promise<any> {

        this.createNewOidcUserManagerInstance(authClient);
        const params = {
            state: {
                businessCode: this.communicationService.businessCode,
                redirectUrl: redirectUrl,
                authClient: authClient
            }
        };

        return this.currentClient.signinRedirect(params)
            .catch(error => this.httpErrorHandlingService.handleAsPromise(error));
    }

    createNewOidcUserManagerInstance(authClient, eventsCallback?): UserManager {
        this.prepareOidcSettings();

        switch (authClient) {
            case AuthClients.BAM:
                if (this.businessAccountManagementClient === undefined) {
                    this.businessAccountManagementClient = new UserManager(this.businessAccountManagementSettings);
                    console.log('businessAccountManagementSettings ', this.businessAccountManagementSettings);
                    //  this.registerEvents(this.businessAccountManagementClient);
                }

                this.currentClient = this.businessAccountManagementClient;
                break;

            case AuthClients.FES:
                if (this.frontendShellClient === undefined) {
                    this.frontendShellClient = new UserManager(this.frontendShellSettings);
                    console.log('frontendShellSettings ', this.frontendShellSettings);
                    //  this.registerEvents(this.frontendShellClient);
                }

                this.currentClient = this.frontendShellClient;
                break;
        }
        this.registerEvents(this.currentClient, eventsCallback);

        return this.currentClient;
    }

    signinRedirectCallback(eventsCallback): Promise<User> {

        return new UserManager({})
            .signinRedirectCallback()
            .then(identityUserModel => {
                if (identityUserModel && identityUserModel.state) {
                    this.createNewOidcUserManagerInstance(identityUserModel.state.authClient, eventsCallback);
                    return identityUserModel;
                }
            });
    }

    signout(id_token: string): Promise<any> {
        return this.currentClient
            .signoutRedirect({ 'id_token_hint': id_token })
            .catch(error => this.httpErrorHandlingService.handleAsPromise(error));
    }


    private prepareOidcSettings() {

        const protocol = location.protocol;
        const hostname = location.hostname;
        let port: string = location.port;
        port = port === '80' || port === '443' || port === '' ? '' : ':' + port;

        let baseHref = this.locationStrategy.getBaseHref().replace('/', '').replace('/', '');
        baseHref = ''; // baseHref !== '' ? '/' + baseHref : '';
        const redirect_uri = protocol + '//' + hostname + port + baseHref + '/callback';
        const post_logout_redirect_uri = protocol + '//' + hostname + port + baseHref + '/home';
        const extraQueryParams = {
            BusinessCode: this.communicationService.businessCode
        };

        const identityResources = ' openid profile ';
        this.businessAccountManagementSettings = {
            authority: this.communicationService.authority,
            client_id: AuthClients.BAM,
            redirect_uri: redirect_uri,
            post_logout_redirect_uri: post_logout_redirect_uri,
            // silent_redirect_uri: '',
            response_type: 'id_token token',
            scope: 'BusinessAccountManagementApi' + identityResources,
            filterProtocolClaims: true,
            loadUserInfo: false,
            extraQueryParams: extraQueryParams
        };

        this.frontendShellSettings = {
            authority: this.communicationService.authority,
            client_id: AuthClients.FES,
            redirect_uri: redirect_uri,
            post_logout_redirect_uri: post_logout_redirect_uri,
            // silent_redirect_uri: '',
            response_type: 'id_token token',
            scope: 'JourneyDefinitionAPI CaptureStudioAPI InvestigationStudioAPI VisionCortexAPI' + identityResources,
            filterProtocolClaims: true,
            loadUserInfo: false,
            extraQueryParams: extraQueryParams
        };
    }

    private registerEvents(oidcClient, eventsCallback?) {
        if (oidcClient) {
            oidcClient.events.addAccessTokenExpiring(() =>
                this.logger.info(`token expiring`)
            );

            oidcClient.events.addAccessTokenExpired(() => {
                this.logger.error(`token expired`);
                if (eventsCallback) {
                    eventsCallback('token expired');
                }
            });

            // oidcClient.events.addSilentRenewError(e =>
            //     this.logger.log(`silent renew error`, e.message)
            // );

            oidcClient.events.addUserLoaded(user =>
                this.logger.log(`user loaded`, user)
            );

            oidcClient.events.addUserUnloaded(e =>
                this.logger.log(`user unloaded`)
            );
        }
    }
}
