import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { SubDomainService } from './sub-domain.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CommunicationService {
    // subject: BehaviorSubject<any>;
    private _authority: string;
    private _businessCode: string;
    private _api: any;
    private _visionCortexBasePath: string;

    constructor(private subDomainService: SubDomainService) { }

    public get businessCode(): string {
        return this._businessCode;
    }

    public get authority(): string {
        return this._authority;
    }

    public get api(): any {
        return this._api;
    }

    public get visionCortexBasePath(): string {
        return this._visionCortexBasePath;
    }

}
