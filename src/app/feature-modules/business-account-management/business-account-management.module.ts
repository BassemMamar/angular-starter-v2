/* Angular Imports */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* BusinessAccountManagement Imports */
import {
  BusinessAccountManagementRoutingModule
} from './business-account-management-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module';

import { BusinessAccountManagementComponent } from './business-account-management.component';
import { ListComponent } from './businesses/list/list.component';
import { EditComponent } from './businesses/edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forChild(),
    LayoutModule,
    BusinessAccountManagementRoutingModule
  ],
  declarations: [BusinessAccountManagementComponent, ListComponent, EditComponent]
})
export class BusinessAccountManagementModule { }
