/* Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Investigation Imports */
import { InvestigationStudioRoutingModule } from './investigation-studio-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module';

import { InvestigationComponent } from './investigation-studio.component';
import { RecentJourneysComponent } from './recent-journeys/recent-journeys.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forChild(),
    LayoutModule,
    InvestigationStudioRoutingModule
  ],
  declarations: [InvestigationComponent, RecentJourneysComponent]
})
export class InvestigationStudioModule { }
