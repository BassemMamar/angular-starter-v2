import { Injectable } from '@angular/core';

import * as $ from 'jquery';

@Injectable()
export class UnwrapTagService {

  constructor() { }

  unwrapTag(element) {
    $(element).removeAttr('appUnwrapTag').unwrap();
  }
}
