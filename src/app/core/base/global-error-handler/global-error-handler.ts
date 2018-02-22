import { Injectable, ErrorHandler, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { LoggerService } from '../logger/logger.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    // https://medium.com/@amcdnl/global-error-handling-with-angular2-6b992bdfb59c
    constructor(
        @Inject(LoggerService) private logger: LoggerService,
        @Inject(LocationStrategy) private location: LocationStrategy
    ) { }

    handleError(error) {
        this.logger.error('[GlobalErrorHandler]', error);
    }
}

export const GlobalErrorHandlerProvider = {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler
};
