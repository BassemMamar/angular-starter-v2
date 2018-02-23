import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SubDomainService } from './sub-domain.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CommunicationService {
    private _authority: string;
    private _api: any;

    constructor(private subDomainService: SubDomainService) { }


    public get authority(): string {
        return this._authority;
    }

    public get api(): any {
        return this._api;
    }

}
