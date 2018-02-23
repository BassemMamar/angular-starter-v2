import { Component, OnInit } from '@angular/core';

import { LoggerService } from '../../core/base/logger/logger.service';

@Component({
  templateUrl: './investigation-studio.component.html',
  styleUrls: ['./investigation-studio.component.scss']
})
export class InvestigationComponent implements OnInit {

  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.logger.info(`InvestigationComponent has been Initiated..`);
  }
}
