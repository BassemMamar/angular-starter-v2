import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AuthService } from '../services/auth.service';
import { LoggerService } from '../../base/logger/logger.service';
import { AuthorizationService } from '../pages-access-authorization/authorization.service';
import { PageAuthorizationInfo, RolesAccess } from '../model/access-authorization-model-info';

@Injectable()
export class AuthorizedGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router,
    private authorizationService: AuthorizationService,
    private logger: LoggerService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.logger.log(`AuthorizedGuard=> canActivate=> state.url: ${state.url}`);
    return this.checkauthority(next.data.moduleName, next.data.pageName);
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.logger.log(`AuthorizedGuard=> canActivateChild=> state.url: ${state.url}`);
    return this.checkauthority(next.parent.data.moduleName, next.parent.data.pageName);
  }
  /**
   * checkauthority function take a decission if current user has right to access current page
   *  it depends on one or both moduleName and pageName to be able to take the decission
   * @param moduleName it's feature module in our case
   * @param pageName page name of the page that the current navigation comes in
   */
  private checkauthority(moduleName: string, pageName: string): Observable<boolean> | boolean {

    const matchedRolesAccess: RolesAccess[] = this.authorizationService.getRolesAccess(moduleName, pageName);
    /**
     * In this level we should have a collection roles access
     * Do matching with current user roles
     * As a result will have a boolean result tell if the current user has right to proceed
     */
    if (!matchedRolesAccess || matchedRolesAccess.length === 0) {
      throw new Error(`There is no matched roles access with page name (${pageName}) and module name (${moduleName})..`);
    }
    const authorized = this.authService.userProfile.roles
      .find(r => (<string[]>matchedRolesAccess.map(ra => ra.role)).indexOf(r) !== -1);

    if (authorized) {
      return true;
    } else {
      this.router.navigate(['/Unauthorized']);
      return false;
    }
  }
}
