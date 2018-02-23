/* Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Investigation Imports */
import { InvestigationRoutingModule } from './investigation-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module';

import { InvestigationComponent } from './investigation.component';
import { RecentJourneysComponent } from './recent-journeys/recent-journeys.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forChild(),
    LayoutModule,
    InvestigationRoutingModule
  ],
  declarations: [InvestigationComponent, RecentJourneysComponent]
})
export class InvestigationModule { }
