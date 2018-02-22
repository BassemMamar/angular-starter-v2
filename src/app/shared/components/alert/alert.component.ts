import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { AlertService } from './alert.service';
import { Alert } from './model/alert';
import { AlertType } from './model/alert-type';

// http://jasonwatmore.com/post/2017/06/25/angular-2-4-alert-toaster-notifications
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'shrd-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  alerts: Alert[] = [];
  @Input() id: string;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService
      .getAlert()
      .subscribe((alert: Alert) => {
        if (!alert) {
          // clear alerts when an empty alert is received
          this.alerts = [];
          return;
        }

        if (alert.hostId === this.id) {
          // add alert to array
          this.alerts.push(alert);

          // if showDuring is specified, will remove the alert after this time
          if (alert.showDuration > 0) {
            setTimeout(() => {
              this.removeAlert(alert);
            }, alert.showDuration);
          }
        }
      });
  }

  ngOnDestroy() {
    this.alerts = [];
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        return 'alert alert-success';
      case AlertType.Error:
        return 'alert alert-danger';
      case AlertType.Info:
        return 'alert alert-info';
      case AlertType.Warning:
        return 'alert alert-warning';
    }
  }


  icon(alert: Alert) {
    if (!alert) {
      return;
    }

    // return font awesome icon based on alert type
    switch (alert.type) {
      case AlertType.Success:
        return 'fa fa-check-circle';
      case AlertType.Error:
        return 'fa fa-ban';
      case AlertType.Info:
        return 'fa fa-info-circle';
      case AlertType.Warning:
        return 'fa fa-exclamation-circle';
    }
  }

}
