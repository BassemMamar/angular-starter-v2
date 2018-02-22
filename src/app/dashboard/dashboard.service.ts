import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandlingService } from '../core/services/http-error-handling/http-error-handling.service';
import { LoggerService } from '../core/base/logger/logger.service';

@Injectable()
export class DashboardService {
    constructor(private http: HttpClient, private logger: LoggerService, private httpErrorHandlingService: HttpErrorHandlingService) { }

    getHeros() {
        return this.http.get('api/heroes')
            .pipe(
            catchError(error => this.httpErrorHandlingService.handleAsObservable(error))
            );
    }

}
