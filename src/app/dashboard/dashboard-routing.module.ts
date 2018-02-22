import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { CaseInsensitiveMatcher } from '../core/base/url-case-insensitive/case-insensitive-matcher';

export function HomeMatch() {
  return CaseInsensitiveMatcher('Home').apply(this, arguments);
}

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        matcher: HomeMatch,
        component: HomeComponent
      },
      { path: '', pathMatch: 'full', redirectTo: 'Home' }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
