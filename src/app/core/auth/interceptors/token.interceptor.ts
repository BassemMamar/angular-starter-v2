import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // https://ryanchenkie.com/angular-authentication-using-the-http-client-and-http-interceptors
  // https://stackoverflow.com/a/45129865/3635406
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /**
     * You can't directly modify the existing headers within the previous options object
     * because instances of the HttpHeaders class are immutable.
     * that's why we use clone
     * The clone() method's hash argument allows you to mutate specific properties of the request while copying the others.
     * https://angular.io/guide/http#update-headers
     */
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.userProfile.access_token}`
      }
    });

    return next.handle(request);
  }
}

export const TokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
};
