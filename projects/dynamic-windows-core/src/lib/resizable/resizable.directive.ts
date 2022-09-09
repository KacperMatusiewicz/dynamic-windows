import {AfterViewInit, Directive, ElementRef, Inject, Input} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {fromEvent, Subscription, takeUntil} from "rxjs";
import {Resizable} from "./resizable";

@Directive({
  selector: '[dw-resizable]'
})
export class ResizableDirective extends Resizable implements AfterViewInit{

  @Input("anchor-size")
  anchorSizeInput: string = "10";


  constructor(
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private doc: any
  ) {
    super(elementRef, doc);

  }

  ngAfterViewInit(): void {
    super.setAnchorSize(this.anchorSizeInput);
    super.resizableAfterViewInit();

  }

  ngOnDestroy(): void {
    super.resizableOnDestroy();
  }

}
