import {AfterViewInit, Directive, ElementRef, Inject, OnDestroy} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {Draggable} from "./draggable";

@Directive({
  selector: '[dw-draggable]'
})
export class DraggableDirective extends Draggable implements AfterViewInit, OnDestroy{


  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private doc: any
  ) {
    super(elementRef, doc);
  }

  ngAfterViewInit(): void {
    super.draggableAfterViewInit();
  }

  ngOnDestroy(): void {
    super.draggableOnDestroy();
  }


}
