import { Injectable } from '@angular/core';

import * as Cookies from 'js-cookie';

@Injectable()
export class StorageService {
    /**
     * Here we use localStorage for storing data
     * may change it to Cookie for example any time just from here
     */
    constructor() { }

    setItem(key: string, data: string | object): void {
        // localStorage.setItem(key, data);
        Cookies.set(key, data);
    }

    getItem(key: string): string {
        // return localStorage.getItem(key);
        return Cookies.get(key);
    }

    removeItem(key: string): void {
        //  localStorage.removeItem(key);
        Cookies.remove(key);

    }
}


//#region test
// https://developers.livechatinc.com/blog/setting-cookies-to-subdomains-in-javascript/

// const host = location.host;
// if (host.split('.').length === 1) {
//     // no "." in a domain - it's localhost or something similar
//     Cookies.set(key, data, { path: '/' });
//     console.log('domain default ... ');
// } else {
//     // Remember the cookie on all subdomains.
//     //
//     // Start with trying to set cookie to the top domain.
//     // (example: if user is on foo.com, try to set
//     //  cookie to domain ".com")
//     //
//     // If the cookie will not be set, it means ".com"
//     // is a top level domain and we need to
//     // set the cookie to ".foo.com"
//     const domainParts = host.split('.');
//     domainParts.shift();
//     let domain = '.' + domainParts.join('.');

//     console.log('domain ', domain);

//     Cookies.set(key, data, { domain: domain, path: '/' });

//     // check if cookie was successfuly set to the given domain
//     // (otherwise it was a Top-Level Domain)

//     // tslint:disable-next-line:triple-equals
//     if (Cookies.get(name) == null) { // || Cookies.get(name) != data) {
//         // append "." to current domain
//         domain = '.' + host;
//         console.log('domain ', domain);
//         Cookies.set(key, data, { domain: domain, path: '/' });
//     }
// }
//#endregion
