import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Alert } from './model/alert';
import { AlertType } from './model/alert-type';
import { LoggerService } from '../../../core/base/logger/logger.service';
import { AlertOptions } from './model/alert-options';

@Injectable()
export class AlertService {
    private subject = new Subject<Alert>();
    private keepAfterRouteChange = false;

    constructor(private router: Router, private logger: LoggerService) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, title = 'Well done!', alertOptions?: AlertOptions) {
        this.alert(AlertType.Success, title, message, alertOptions);
    }

    error(message: string, title = 'Opps!', alertOptions?: AlertOptions) {
        this.alert(AlertType.Error, title, message, alertOptions);
    }

    info(message: string, title = 'Info!', alertOptions?: AlertOptions) {
        this.alert(AlertType.Info, title, message, alertOptions);
    }

    warn(message: string, title = 'Warning!', alertOptions?: AlertOptions) {
        this.alert(AlertType.Warning, title, message, alertOptions);
    }

    private alert(type: AlertType, title: string, message: string, alertOptions?: AlertOptions) {
        const options = alertOptions ? alertOptions : new AlertOptions();

        this.keepAfterRouteChange = options.keepAfterRouteChange;
        this.subject.next(<Alert>{
            type: type,
            title: title,
            message: message,
            hostId: options.hostId,
            showDuration: options.showDuration
        });
    }

    clear() {
        // clear alerts
        this.subject.next();
    }
}
