import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import { PageLoaderService } from './core/components/page-loader/page-loader.service';
import { LoggerService } from './core/base/logger/logger.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  currentTheme: string;

  constructor(private router: Router, private route: ActivatedRoute,
    private logger: LoggerService, private pageLoader: PageLoaderService,
    @Inject(DOCUMENT) private document) {
  }

  ngOnInit() {
    const langValue = this.route.snapshot.paramMap.getAll('lang');
    this.logger.info(`AppComponent - Lang value is: ${langValue}`);
  }

  handelChangeTheme(event) {

    const element = $('head'); // this.document.getElementsByTagName('head')[0];
    $('#darktheme').remove();
    $('#lighttheme').remove();

    if (this.currentTheme === 'dark') {
      const darktheme = '<link id="darktheme" type="text/css" rel="stylesheet" href="assets/css/style-rtl.css"/>';
      element.append(darktheme);
      this.currentTheme = 'light';
    } else {
      const lighttheme = '<link id="lighttheme" type="text/css" rel="stylesheet" href="assets/css/style.css" />';
      element.append(lighttheme);
      this.currentTheme = 'dark';
    }
  }

  ngAfterViewInit() {

    this.router.events.subscribe((route) => {
      /* Route Navigation Start */
      if (route instanceof NavigationStart) {
        this.pageLoader.setLoading(true);
      }

      /* Route Navigation End */
      if (route instanceof NavigationEnd) {
        this.pageLoader.setLoading(false);
        //  this.logger.log('NavigationEnd => route.url => ', route.url);
      }

      /* Route Navigation Error */
      if (route instanceof NavigationError) {
        this.pageLoader.setLoading(false);
      }

    });
  }
}

