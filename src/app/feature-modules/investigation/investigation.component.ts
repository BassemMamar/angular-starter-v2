import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../core/base/logger/logger.service';

@Component({
  templateUrl: './investigation.component.html',
  styleUrls: ['./investigation.component.scss']
})
export class InvestigationComponent implements OnInit {

  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.logger.info(`InvestigationComponent has been Initiated..`);
  }
}
