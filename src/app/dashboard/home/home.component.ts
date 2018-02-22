import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoggerService } from '../../core/base/logger/logger.service';
import { environment } from '../../../environments/environment';
import { CommunicationService } from '../../core/services/communication/communication.service';
import { CommonService } from '../../core/base/utils/common.service';
import { DashboardService } from '../dashboard.service';
import { AlertService } from '../../shared/components/alert/alert.service';
import { ToastrService } from '../../shared/components/toastr/toastr.service';

// ES6 Modules or TypeScript
import swal from 'sweetalert2';

import { BlockUI, NgBlockUI, BlockUIService } from 'ng-block-ui';
import { BlockUITemplateComponent } from '../../shared/components/block-ui/block-ui-template.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

})
export class HomeComponent implements OnInit, AfterViewInit {

  // Pass instance name to decorator
  blockTemplate = BlockUITemplateComponent;
  @BlockUI('alerts-root') blockAlertsRoot: NgBlockUI;
  @BlockUI('alerts-child') blockAlertsChild: NgBlockUI;

  @ViewChild(ModalComponent) private modal: ModalComponent;

  constructor(
    private logger: LoggerService,
    private dashboardService: DashboardService,
    private communicationService: CommunicationService,
    private commonService: CommonService,
    private alertService: AlertService,
    private toasrtService: ToastrService,
    private blockUIService: BlockUIService) { }

  ngOnInit() {
    this.logger.info(`HomeComponent has been Initiated..`);

  }

  ngAfterViewInit() {
    // this.modal.show();
    this.registerModalEvents();
  }

  showModal() {
    this.modal.show();
  }

  save(saved: boolean) {
    if (!saved) {
      this.modal.hide();
    } else {
      this.alertService.error('I do not think that word means what you think it means.', undefined, { hostId: 'modal-alert' });

    }

  }

  registerModalEvents() {
    $(`#${this.modal.id}`).on('hidden.bs.modal', (e) => {
      // do something...
      this.alertService.clear();
    });
  }

  TestInterseptor() {
    this.dashboardService.getHeros()
      .subscribe(
      data => console.log(data),
      err => {
        this.toasrtService.error(err);
        this.alertService.error(err, undefined, { hostId: 'root' });
        swal('Oops...', 'Something went wrong!', 'error');
      }
      );
  }

  TestToastr() {

    // Display an info toast with no title
    this.toasrtService.info('Are you the 6 fingered man?');

    // Display a warning toast, with no title
    this.toasrtService.warning('My name is Inigo Montoya. You killed my father, prepare to die!');

    // Display a success toast, with a title
    this.toasrtService.success('Have fun storming the castle!', 'Miracle Max Says');

    // Display an error toast, with a title
    this.toasrtService.error('I do not think that word means what you think it means.', 'Inconceivable!');

    // // Immediately remove current toasts without using animation
    // this.toasrtService.remove();

    // // Remove current toasts using animation
    // this.toasrtService.clear();

    // Override global options
    this.toasrtService.success('We do have the Kapua suite available.', undefined, { timeOut: 2000 });

    this.blockUIService.start(['alerts-root', 'alerts-child']);
    setTimeout(() => {
      this.blockUIService.stop(['alerts-root', 'alerts-child']);
    }, 3000);
  }

  success(message: string, hostId: string) {
    const title = hostId ? 'ohhhh for ROOT' : undefined;
    this.alertService.success(message, title, { hostId: hostId });
  }

  error(message: string) {
    this.alertService.error(message, undefined, { hostId: 'root', showDuration: 0 });
  }

  info(message: string) {
    this.alertService.info(message);
  }

  warn(message: string) {
    this.alertService.warn(message);
  }

  clear() {
    this.alertService.clear();
  }


  blockRoot() {
    this.blockAlertsRoot.start();
    setTimeout(() => {
      this.blockAlertsRoot.stop();
    }, 300000);
  }

  blockChild() {
    this.blockAlertsChild.start();
    setTimeout(() => {
      this.blockAlertsChild.stop();
    }, 3000);
  }

}
