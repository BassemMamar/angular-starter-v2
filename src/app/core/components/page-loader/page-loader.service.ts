import { Injectable } from '@angular/core';

import * as $ from 'jquery';

@Injectable()
export class PageLoaderService {

  constructor() { }

  setLoading(enable: boolean) {
    const body = $('body');
    if (enable) {
      $(body).addClass('page-loading-block');
    } else {
      $(body).removeClass('page-loading-block');
    }
  }

}
