import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Inject } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { finalize, tap } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';

export class TimingInterceptor implements HttpInterceptor {
  constructor( @Inject(LoggerService) private logger: LoggerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    let ok: string;

    // extend server response observable with logging
    return next.handle(req)
      .pipe(
          tap(
            // Succeeds when there is a response; ignore other events
            event => ok = event instanceof HttpResponse ? 'succeeded' : '',
            // Operation failed; error is an HttpErrorResponse
            error => ok = 'failed'
          ),
          // Log when response observable either completes or errors
          finalize(() => {
            const elapsed = Date.now() - started;
            const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;

            this.logger.info('[TimingInterceptor]', msg);

          })
      );


  }
}

export const TimingInterceptorProvider = { provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true };
