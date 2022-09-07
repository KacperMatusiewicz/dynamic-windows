import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[dw-windowframe]'
})
export class WindowFrameDirective {

  constructor(
    elementRef: ElementRef,

  ) {
    elementRef.nativeElement.classList.add("dw-window-frame");
  }

}
