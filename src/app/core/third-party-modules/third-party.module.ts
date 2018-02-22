import { NgModule } from '@angular/core';

import { environment } from '../../../environments/environment';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemHeroService } from './in-memory-db/in-mem-hero.service';


@NgModule({
    imports: [
      //  !environment.production ? HttpClientInMemoryWebApiModule.forRoot(InMemHeroService) : [],
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class ThirdPartyModule { }
