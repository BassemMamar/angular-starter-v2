import { Directive, AfterViewInit, ElementRef } from '@angular/core';

import { UnwrapTagService } from './unwrap-tag.service';

@Directive({
  selector: '[appUnwrapTag]'
})
export class UnwrapTagDirective implements AfterViewInit {

  constructor(private el: ElementRef, private unwrapTagService: UnwrapTagService) {
  }

  ngAfterViewInit() {
      const nativeElement: HTMLElement = this.el.nativeElement;
      this.unwrapTagService.unwrapTag(nativeElement);
  }

}

