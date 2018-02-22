/* Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Shared Module Imports */
import { SharedModule } from '../shared/shared.module';

/* Layout Module Imports */
import { LayoutModule } from '../layout/layout.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { DashboardService } from './dashboard.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forChild(),
    LayoutModule,
    DashboardRoutingModule
  ],
  exports: [],
  declarations: [DashboardComponent, HomeComponent],
  providers: [DashboardService]
})
export class DashboardModule { }
