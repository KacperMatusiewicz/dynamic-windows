import {AfterViewInit, Directive, ElementRef, Input, OnDestroy, ViewContainerRef} from '@angular/core';
import {Focusable} from "./focusable";
import {WindowStoreService} from "../../window-management/window-store.service";

@Directive({
  selector: '[dw-focusable]'
})
export class FocusableDirective extends Focusable implements AfterViewInit, OnDestroy{

  @Input("recursiveMarking")
  recursiveMarkingInput: string = "false";

  constructor(
    private elementReference: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private winService: WindowStoreService
  ) {
    super(elementReference, viewContainerRef, winService);
  }

  ngAfterViewInit(): void {
    super.focusableAfterViewInit();
    super.setRecursiveMarking(this.recursiveMarkingInput);
  }

  ngOnDestroy(): void {
    super.focusableOnDestroy();
  }


}
