import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoggerService } from '../../../../core/base/logger/logger.service';
import { AccessLevel } from '../../../../core/auth/model/user-roles.enum';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  accessLevel: AccessLevel;
  constructor(
    private route: ActivatedRoute,
    private logger: LoggerService) {
    this.route.paramMap.subscribe(params => this.logger.log(params.get('businessId')));
  }

  ngOnInit() {
    this.accessLevel = <AccessLevel>this.route.snapshot.data['accessLevel'];
    this.logger.info(`accessLevel ${this.accessLevel}`);
  }

}
