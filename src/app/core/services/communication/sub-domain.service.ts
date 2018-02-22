import { Injectable } from '@angular/core';

@Injectable()
export class SubDomainService {
    subDomain: string;

    constructor() {
        this.subDomain = this.determineBasePath();
    }

    private determineBasePath() {
        const fullUrl = window.location.host;
        const splitedUrl = fullUrl.split('.');
        if (splitedUrl.length === 1 || (splitedUrl[0].toLocaleLowerCase() === 'www')) {
            return '';
        }
        return splitedUrl[0];
    }

}
