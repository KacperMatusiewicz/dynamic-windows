import {AfterViewInit, Directive, ElementRef, Inject, OnDestroy, ViewContainerRef} from '@angular/core';
import {WindowStoreService} from "../window-store.service";
import {Draggable} from "../draggable/draggable";
import {DOCUMENT} from "@angular/common";
import {Focusable} from "../focusable/focusable";
import {Resizable} from "../resizable/resizable";

@Directive({
  selector: '[dw-windowframe]'
})
export class WindowFrameDirective implements AfterViewInit, OnDestroy{

  id: number | undefined;
  draggable: Draggable;
  resizable: Resizable;
  focusable: Focusable;

  constructor(
    elementRef: ElementRef,
    private host: ViewContainerRef,
    @Inject(DOCUMENT) doc: any,
    private windowsService: WindowStoreService
  ) {
    this.draggable = new Draggable(elementRef, doc);
    this.resizable = new Resizable(elementRef, doc);
    this.focusable = new Focusable(elementRef, host, windowsService);
    elementRef.nativeElement.classList.add("dw-window-frame");
  }

  ngAfterViewInit(): void {
    this.draggable.draggableAfterViewInit();
    this.focusable.focusableAfterViewInit();
    this.resizable.resizableAfterViewInit();
  }

  ngOnDestroy(): void {
    this.draggable.draggableOnDestroy();
    this.focusable.focusableOnDestroy();
    this.resizable.resizableOnDestroy();
  }

}
