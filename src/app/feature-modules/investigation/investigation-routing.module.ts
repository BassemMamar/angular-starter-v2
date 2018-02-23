import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestigationComponent } from './investigation-studio.component';
import { RecentJourneysComponent } from './recent-journeys/recent-journeys.component';
import { CaseInsensitiveMatcher } from '../../core/base/url-case-insensitive/case-insensitive-matcher';
import { AuthClients } from '../../core/auth/model/auth-clients';
import { AuthenticatedGuard } from '../../core/auth/guards/authenticated.guard';
import { AuthorizedGuard } from '../../core/auth/guards/authorized.guard';
import { AccessLevelResolver } from '../../core/auth/services/access-level.resolver';
import { FrontendShell } from '../../core/auth/pages-access-authorization/app-pages-declaration/app-pages-declaration';

export function RecentJourneysMatch() {
  return CaseInsensitiveMatcher('RecentJourneys').apply(this, arguments);
}

const routes: Routes = [
  {
    path: '',
    component: InvestigationComponent,
    canActivate: [AuthenticatedGuard],
    data: {
      authClient: AuthClients.FES,
      moduleName: FrontendShell.InvestigationStudio.Name
    },

    children: [
      { path: '', pathMatch: 'full', redirectTo: 'RecentJourneys' },
      {
        matcher: RecentJourneysMatch,
        component: RecentJourneysComponent,
        canActivate: [AuthorizedGuard],
        data: {
          moduleName: FrontendShell.InvestigationStudio.Name,
          pageName: FrontendShell.InvestigationStudio.Pages.RecentJourneys
        },
        resolve: {
          accessLevel: AccessLevelResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestigationStudioRoutingModule { }
