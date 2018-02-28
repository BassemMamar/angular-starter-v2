import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { LoggerService } from '../../core/base/logger/logger.service';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']

})
export class ManagementComponent implements OnInit {
  constructor(private logger: LoggerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.logger.info(`ManagementComponent has been Initiated..`);
    const langValue = this.route.snapshot.paramMap.getAll('lang');
    this.logger.info(`ManagementComponent - Lang value is: ${langValue}`);
  }
}
