import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[dw-draggable-space]'
})
export class DraggableSpaceDirective {

  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.classList.add("dw-draggable-space");
  }

}
