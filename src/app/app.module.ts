/* Angular Imports */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

/* Core Module Imports */
import { CoreModule } from './core/core.module';

/* Dashboard Module Imports */
import { DashboardModule } from './dashboard/dashboard.module';

/* Shared Module Imports */
import { SharedModule } from './shared/shared.module';

/* App Imports */
import { AppRoutingModule, appRoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    CoreModule,
    DashboardModule,
    AppRoutingModule,

    // later for service-worker
    //  environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  declarations: [
    AppComponent,
    appRoutingComponents
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
