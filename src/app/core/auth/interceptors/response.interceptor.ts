import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,
    HTTP_INTERCEPTORS, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { AuthService } from '../services/auth.service';

import { LoggerService } from '../../base/logger/logger.service';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
    // https://ryanchenkie.com/angular-authentication-using-the-http-client-and-http-interceptors

    constructor(private authService: AuthService, private logger: LoggerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                /**
                 * Response success
                 * do stuff with response if you want
                 * nothing to do for now
                 */

            }
        });
    }
}

export const ResponseInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ResponseInterceptor,
    multi: true
};
