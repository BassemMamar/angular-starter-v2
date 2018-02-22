import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ModuleAuthorizationInfo, PageAuthorizationInfo, RolesAccess } from '../model/access-authorization-model-info';
import { StorageService } from '../../base/storage/storage.service';
import { LoggerService } from '../../base/logger/logger.service';
import { pagesAccessAuthorizationInfo } from './pages-access-authorization.mock';

@Injectable()
export class AuthorizationService {
  storageKey = 'PagesAccessAuthorizationStorage';
  private _pagesAccessAuthorization: ModuleAuthorizationInfo[];

  constructor(private storageService: StorageService, private logger: LoggerService) {
    // ToDo later
    // const obj = this.storageService.getItem(this.storageKey);
    //  this._pagesAccessAuthorization = obj ? JSON.parse(obj) : undefined;

    this._pagesAccessAuthorization = pagesAccessAuthorizationInfo;
  }

  getPagesAccessAuthorization(): Observable<boolean> {
    // ToDo later
    // 1) get pagesAccessAuthorizationInfo from the server
    // 2) this._pagesAccessAuthorizationInfo = pagesAccessAuthorizationInfo; // rsult object coming from the server

    this.storageService.setItem(this.storageKey, pagesAccessAuthorizationInfo);

    return of(true);
  }


  public get pagesAccessAuthorization(): ModuleAuthorizationInfo[] {
    if (!this._pagesAccessAuthorization) {
      // ToDo later
      // this._pagesAccessAuthorization = JSON.parse(this.storageService.getItem(this.storageKey));
    }

    return this._pagesAccessAuthorization;
  }

  public remove() {
    this._pagesAccessAuthorization = undefined;
    // ToDo later
    // this.storageService.removeItem(this.storageKey);
  }

  getRolesAccess(moduleName: string, pageName: string): RolesAccess[] {

    let currentPage: PageAuthorizationInfo;
    let matchedPages: PageAuthorizationInfo[];
    let matchedRolesAccess: RolesAccess[];
    const _pagesAccessAuthorization = this.pagesAccessAuthorization;
    this.logger.log('PagesAccessAuthorization: ', _pagesAccessAuthorization);

    /**
     * Nither module name nor page name is provided
     * In this case will throw an exception.
     */
    if (!moduleName && !pageName) {
      throw new Error(`Can NOT check authority for unknown moduleName and pageName`);
    }

    /**
     * Just module name is provided
     * In this case will try to get default roles access specified for the module it self
     */
    if (moduleName && !pageName) {
      const currentModule = _pagesAccessAuthorization.find(m => m.name.toLowerCase() === moduleName.toLowerCase());
      if (!currentModule) {
        throw new Error(`Module name (${moduleName}) does not exist in the PagesAccessAuthorization ..`);
      }
      matchedRolesAccess = currentModule.rolesAccess;
    } else {

      /**
       * Module name and page name are provided
       * In this case:
       * First get the matched module information
       * Second get matched pages in this module
       * As a result will have a collection of matched pages in one module
       */
      if (moduleName && pageName) {
        const currentModule = _pagesAccessAuthorization.find(m => m.name.toLowerCase() === moduleName.toLowerCase());
        if (!currentModule) {
          throw new Error(`Module name (${moduleName}) does not exist in the PagesAccessAuthorization ..`);
        }

        matchedPages = currentModule.pages.filter(p => p.name.toLowerCase() === pageName.toLowerCase());
      }

      /**
       * Just page name is provided
       * In this case will try to get any matched page in the all modules
       * Do some validation
       * As a result will have a collection of matched pages in one module
       */
      if (!moduleName && pageName) {
        const matchedData = _pagesAccessAuthorization.filter(m => m.pages.filter(p => p.name.toLowerCase() === pageName.toLowerCase()));
        if (matchedData.length > 1) {
          throw new Error(`Page name (${pageName}) has founded in more than one module. Please specify moduleName for current route..`);
        }
        if (matchedData.length === 0) {
          throw new Error(`Page name (${pageName}) does not exist in any module..`);
        }
        matchedPages = matchedData[0].pages;
      }

      /**
       * In this level we should have a collection matched pages in one module
       * Do some validation
       * As a result will have a matched page
       */
      if (matchedPages.length > 1) {
        throw new Error(`Duplicate page name (${pageName}) in the (${moduleName}) module..`);
      }
      if (matchedPages.length === 0) {
        throw new Error(`Page name (${pageName}) does not exist in (${moduleName}) module..`);
      }

      /**
       * Get roles access specified for the matched page
       */
      currentPage = matchedPages[0];
      matchedRolesAccess = currentPage.rolesAccess;
    }

    return matchedRolesAccess;
  }
}
