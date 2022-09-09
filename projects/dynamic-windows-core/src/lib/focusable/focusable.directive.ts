import {AfterViewInit, Directive, ElementRef, OnDestroy, ViewContainerRef} from '@angular/core';
import {WindowStoreService} from "../window-store.service";
import {DynamicWindow} from "../dynamic-window";
import {fromEvent, Subscription} from "rxjs";
import {Focusable} from "./focusable";

@Directive({
  selector: '[dw-focusable]'
})
export class FocusableDirective extends Focusable implements AfterViewInit, OnDestroy{

  constructor(
    private elementReference: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private winService: WindowStoreService
  ) {
    super(elementReference, viewContainerRef, winService);
  }

  ngAfterViewInit(): void {
    super.focusableAfterViewInit();
  }

  ngOnDestroy(): void {
    super.focusableOnDestroy();
  }


}
