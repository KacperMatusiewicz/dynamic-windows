import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[dw-non-draggable-space]'
})
export class NonDraggableSpaceDirective{

  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.classList.add("dw-non-draggable-space");
  }


}
