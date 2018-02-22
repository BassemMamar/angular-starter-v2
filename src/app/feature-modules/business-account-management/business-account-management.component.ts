import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { LoggerService } from '../../core/base/logger/logger.service';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';

@Component({
  templateUrl: './business-account-management.component.html',
  styleUrls: ['./business-account-management.component.scss']

})
export class BusinessAccountManagementComponent implements OnInit {
  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.logger.info(`BusinessAccountManagementComponent has been Initiated..`);
  }
}
