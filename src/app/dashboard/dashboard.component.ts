import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit() {



  }

}
