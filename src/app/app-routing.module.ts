/* Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Service to Handle Lazy Load Feature Modules */
import { SelectivePreloadingStrategy } from './core/base/lazy-loading/selective-preloading-strategy';


import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { CaseInsensitiveMatcher } from './core/base/url-case-insensitive/case-insensitive-matcher';

// region routes path Matchers
export function ManagementMatch() {
  return CaseInsensitiveMatcher('Management').apply(this, arguments);
}
export function InvestigationMatch() {
  return CaseInsensitiveMatcher('Investigation').apply(this, arguments);
}
// endregion

const routes: Routes = [

  {
    matcher: ManagementMatch,
    loadChildren: 'app/feature-modules/management/management.module#ManagementModule',
    data: { preload: false }
  },
  {
    matcher: InvestigationMatch,
    loadChildren: 'app/feature-modules/investigation/investigation.module#InvestigationModule',
    data: { preload: false }
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },

  /* Wildcard Routes ,should be the last route configuration */
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: false, // <-- debugging purposes only
      preloadingStrategy: SelectivePreloadingStrategy

    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingComponents = [];
