import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { AsideNavComponent } from './aside-nav/aside-nav.component';



@NgModule({
  imports: [
    SharedModule.forChild(),
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    AsideNavComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    AsideNavComponent
  ],
  providers: []
})
export class LayoutModule { }
