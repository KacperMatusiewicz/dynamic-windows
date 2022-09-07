import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[non-draggable-space]'
})
export class NonDraggableSpaceDirective{

  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.classList.add("non-draggable-space");
  }


}
