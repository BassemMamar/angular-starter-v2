import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './businesses/list/list.component';
import { EditComponent } from './businesses/edit/edit.component';

import { CaseInsensitiveMatcher } from '../../core/base/url-case-insensitive/case-insensitive-matcher';
import { AuthClients } from '../../core/auth/model/auth-clients';
import { AuthenticatedGuard } from '../../core/auth/guards/authenticated.guard';
import { AuthorizedGuard } from '../../core/auth/guards/authorized.guard';
import { FrontendShell } from '../../core/auth/pages-access-authorization/app-pages-declaration/app-pages-declaration';
import { AccessLevelResolver } from '../../core/auth/services/access-level.resolver';
import { ManagementComponent } from './management.component';
import { HeroFormComponent } from './heros/hero-form/hero-form.component';

export function ListBusinessMatch() {
  return CaseInsensitiveMatcher('List').apply(this, arguments);
}
export function EditBusinessMatch() {
  return CaseInsensitiveMatcher('Edit/:businessId').apply(this, arguments);
}
export function HeroFormMatch() {
  return CaseInsensitiveMatcher('Hero').apply(this, arguments);
}


const routes: Routes = [
  {
    path: '',
    component: ManagementComponent,
    // canActivate: [AuthenticatedGuard],
    // canActivateChild: [AuthenticatedGuard, AuthorizedGuard],
    data: {
      authClient: AuthClients.Management,
      moduleName: FrontendShell.Management.Name
    },
    children: [
      {
        matcher: ListBusinessMatch, component: ListComponent,
        data: {
        },
        resolve: {
          accessLevel: AccessLevelResolver
        }
      },

      {
        matcher: EditBusinessMatch, component: EditComponent,
        data: {
          pageName: FrontendShell.Management.Pages.EditBusiness
        },
        resolve: {
          accessLevel: AccessLevelResolver
        }
      },

      {
        matcher: HeroFormMatch, component: HeroFormComponent
      },

       { path: '', pathMatch: 'full', redirectTo: 'List' }


    ]
  },


 // { path: '**', pathMatch: 'full', redirectTo: '/List' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
