import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { CallbackComponent } from './callback/callback.component';
import { AuthService } from './services/auth.service';
import { OidcService } from './services/oidc.service';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthorizedGuard } from './guards/authorized.guard';
import { AccessLevelResolver } from './services/access-level.resolver';
import { AuthorizationService } from './pages-access-authorization/authorization.service';
import { TokenInterceptorProvider } from './interceptors/token.interceptor';
import { ResponseInterceptorProvider } from './interceptors/response.interceptor';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  declarations: [CallbackComponent],
  providers: [
    AuthService,
    OidcService,
    AuthorizationService,
    AuthenticatedGuard,
    AuthorizedGuard,
    AccessLevelResolver,
    TokenInterceptorProvider,
    ResponseInterceptorProvider
  ]
})
export class AuthModule { }
