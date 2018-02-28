import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from '../core/base/logger/logger.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,  private logger: LoggerService) { }
  ngOnInit() {

    const langValue = this.route.snapshot.paramMap.getAll('lang');
    this.logger.info(`DashboardComponent - Lang value is: ${langValue}`);

  }

}
