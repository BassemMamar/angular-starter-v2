import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoggerService } from '../../base/logger/logger.service';
import { Inject } from '@angular/core';
import { RolesAccess } from '../model/access-authorization-model-info';
import { AuthorizationService } from '../pages-access-authorization/authorization.service';
import { AccessLevel } from '../model/user-roles.enum';

export class AccessLevelResolver implements Resolve<string> {

    constructor(
        @Inject(LoggerService) private logger: LoggerService,
        @Inject(AuthorizationService) private authorizationService: AuthorizationService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AccessLevel {
        const moduleName = route.data.moduleName || route.parent.data.moduleName;
        const pageName = route.data.pageName || route.parent.data.pageName;
        this.logger.info(`AccessLevelResolver=> resolve=> moduleName: (${moduleName}), pageName: (${pageName}) `);

        const matchedRolesAccess: RolesAccess[] = this.authorizationService.getRolesAccess(moduleName, pageName);
        if (!matchedRolesAccess || matchedRolesAccess.length === 0) {
            throw new Error(`There is no matched roles access with page name (${pageName}) and module name (${moduleName})..`);
        }

        const FullAccess = matchedRolesAccess.find(ra => ra.accessLevel === AccessLevel.FullAccess);
        if (FullAccess) {
            return AccessLevel.FullAccess;
        }
        const readOnly = matchedRolesAccess.find(ra => ra.accessLevel === AccessLevel.ReadOnly);
        if (readOnly) {
            return AccessLevel.ReadOnly;
        }

        this.logger.info(`AccessLevelResolver=> resolve=> matchedRolesAccess: (${matchedRolesAccess}) `);
        throw new Error(`There is no access level specified`);
    }

}
