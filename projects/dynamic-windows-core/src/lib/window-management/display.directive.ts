import {AfterViewInit, Directive, ViewContainerRef} from '@angular/core';
import {WindowStoreService} from "./window-store.service";

@Directive({
  selector: '[dw-display]'
})
export class DisplayDirective {

  constructor(private viewContainerRef: ViewContainerRef, private windowsStoreService: WindowStoreService) {
    this.windowsStoreService.setWindowContainerRef(this.viewContainerRef);
  }

}
