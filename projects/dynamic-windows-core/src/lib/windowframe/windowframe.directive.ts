import {AfterViewInit, Directive, ElementRef, ViewContainerRef} from '@angular/core';
import {DynamicWindow} from "../dynamic-window";
import {WindowStoreService} from "../window-store.service";

@Directive({
  selector: '[dw-windowframe]'
})
export class WindowFrameDirective implements AfterViewInit {

  id: number | undefined;

  constructor(
    elementRef: ElementRef,
    private host: ViewContainerRef,
    private windowsService: WindowStoreService<DynamicWindow>
  ) {

    elementRef.nativeElement.classList.add("dw-window-frame");
  }

  ngAfterViewInit(): void {

  }

}
