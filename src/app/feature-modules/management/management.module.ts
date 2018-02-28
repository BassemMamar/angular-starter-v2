/* Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Management Imports */
import { ManagementRoutingModule } from './management-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module';

import { ListComponent } from './businesses/list/list.component';
import { EditComponent } from './businesses/edit/edit.component';
import { ManagementComponent } from './management.component';
import { HeroFormComponent } from './heros/hero-form/hero-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forChild(),
    LayoutModule,
    ManagementRoutingModule
  ],
  declarations: [
    ManagementComponent,
    ListComponent,
    EditComponent,
    HeroFormComponent
  ]
})
export class ManagementModule { }
