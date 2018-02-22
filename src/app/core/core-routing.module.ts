/* Angular Imports */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Core Routing Components Imports */
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { InternalServerErrorComponent } from './components/internal-server-error/internal-server-error.component';
import { pathMatcher, CaseInsensitiveMatcher } from './base/url-case-insensitive/case-insensitive-matcher';

// const unauthorizedMatch = () => CaseInsensitiveMatcher('Unauthorized').apply(this);
// const errorMatch = () => CaseInsensitiveMatcher('Error');
export function UnauthorizedMatch() {
  return CaseInsensitiveMatcher('Unauthorized').apply(this, arguments);
}
export function ErrorMatch() {
  return CaseInsensitiveMatcher('Error').apply(this, arguments);
}

const routes: Routes = [
  {
    matcher:  UnauthorizedMatch,
    // path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    matcher: ErrorMatch,
    // path: 'error',
    component: InternalServerErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule { }
