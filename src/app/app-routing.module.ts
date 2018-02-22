/* Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Service to Handle Lazy Load Feature Modules */
import { SelectivePreloadingStrategy } from './core/base/lazy-loading/selective-preloading-strategy';


import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { CaseInsensitiveMatcher } from './core/base/url-case-insensitive/case-insensitive-matcher';

// region routes path Matchers
export function BusinessAccountManagementMatch() {
  return CaseInsensitiveMatcher('BusinessAccountManagement').apply(this, arguments);
}
export function InvestigationStudioMatch() {
  return CaseInsensitiveMatcher('InvestigationStudio').apply(this, arguments);
}
// endregion

const routes: Routes = [
  {
    matcher: BusinessAccountManagementMatch,
    // path: 'bam',
    loadChildren: 'app/feature-modules/business-account-management/business-account-management.module#BusinessAccountManagementModule',
    data: { preload: false }
  },
  {
    matcher: InvestigationStudioMatch,
    // path: 'investigation',
    loadChildren: 'app/feature-modules/investigation-studio/investigation-studio.module#InvestigationStudioModule',
    data: { preload: false }
  },

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
