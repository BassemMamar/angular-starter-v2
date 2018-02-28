import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import { PageLoaderService } from './core/components/page-loader/page-loader.service';
import { LoggerService } from './core/base/logger/logger.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private route: ActivatedRoute,
    private logger: LoggerService, private pageLoader: PageLoaderService) { }

  ngOnInit() {
    const langValue = this.route.snapshot.paramMap.getAll('lang');
    this.logger.info(`AppComponent - Lang value is: ${langValue}`);
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

