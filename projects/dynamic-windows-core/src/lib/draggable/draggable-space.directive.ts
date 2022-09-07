import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[draggable-space]'
})
export class DraggableSpaceDirective {

  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.classList.add("draggable-space");
  }

}
