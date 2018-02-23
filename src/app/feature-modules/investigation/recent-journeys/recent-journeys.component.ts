import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../../core/base/logger/logger.service';
import { ActivatedRoute } from '@angular/router';
import { AccessLevel } from '../../../core/auth/model/user-roles.enum';

@Component({
  selector: 'app-recent-journeys',
  templateUrl: './recent-journeys.component.html',
  styleUrls: ['./recent-journeys.component.scss']
})
export class RecentJourneysComponent implements OnInit {
  accessLevel: AccessLevel;

  constructor(private route: ActivatedRoute, private logger: LoggerService) { }

  ngOnInit() {
    this.logger.info(`RecentJourneysComponent has been Initiated..`);
    this.accessLevel = <AccessLevel> this.route.snapshot.data['accessLevel'];
    this.logger.info(`accessLevel ${this.accessLevel}`);
  }

}
