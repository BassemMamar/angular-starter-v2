import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { LoggerService } from '../../core/base/logger/logger.service';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';

@Component({
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']

})
export class ManagementComponent implements OnInit {
  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.logger.info(`ManagementComponent has been Initiated..`);
  }
}
