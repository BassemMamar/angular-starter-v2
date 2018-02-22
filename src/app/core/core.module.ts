/* Angular Imports */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, UrlSerializer } from '@angular/router';

/* Base Imports */
import { BaseModule } from './base/base.module';
import { throwIfAlreadyLoaded } from './base/module-import-guard/module-import-guard';

/* Auth Imports */
import { AuthModule } from './auth/auth.module';

/* Core Imports */
import { CoreRoutingModule } from './core-routing.module';
import { CommunicationService } from './services/communication/communication.service';
import { SubDomainService } from './services/communication/sub-domain.service';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { PageLoaderService } from './components/page-loader/page-loader.service';
import { PageLoaderComponent } from './components/page-loader/page-loader.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';
import { HttpErrorHandlingService } from './services/http-error-handling/http-error-handling.service';

/* Third Party Imports */
import { ThirdPartyModule } from './third-party-modules/third-party.module';

@NgModule({
  imports: [
    BrowserModule, // Which import CommonModule internally
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    RouterModule,
    BaseModule,
    AuthModule,

    /* Core Routings */
    CoreRoutingModule,

    /* 3rd Library imports goes here */
    ThirdPartyModule
  ],
  declarations: [
    PageNotFoundComponent,
    UnauthorizedComponent,
    InternalServerErrorComponent,
    TooltipsComponent,

    ScrollTopComponent,
    PageLoaderComponent
  ],
  exports: [

    PageNotFoundComponent,
    ScrollTopComponent,
    PageLoaderComponent
  ],
  providers: [
    CommunicationService,
    SubDomainService,
    PageLoaderService,
    HttpErrorHandlingService
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}


