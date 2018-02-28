import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterState, Router } from '@angular/router';
import { LoggerService } from '../../base/logger/logger.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  Langs = ['en', 'fr', 'ar'];
  constructor(private route: ActivatedRoute, private logger: LoggerService, private router: Router) {
    // const langValue = this.route.snapshot.paramMap.get('lang');
    // this.logger.info(`LanguageComponent - Lang value is: ${langValue}`);
    this.logger.info(`LanguageComponent - state.root: ${router.routerState.root}`);
    this.logger.info(`LanguageComponent - state.url: ${router.routerState.snapshot.url}`);
    this.logger.info(`LanguageComponent - route.snapshot..url: ${this.route.snapshot.url}`);

    this.route.paramMap.subscribe(params => {
      const langValue = params.get('lang');
      this.logger.info(`LanguageComponent - Lang value is: ${langValue}`);

      if (this.Langs.indexOf(langValue) === -1) {
    this.logger.info(`/en${router.routerState.snapshot.url}`);
    this.router.navigateByUrl(`/en${router.routerState.snapshot.url}`);
      }
    });

  }

  ngOnInit() {
  }

}
