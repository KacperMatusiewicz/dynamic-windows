import {AfterViewInit, Directive, ElementRef, OnDestroy, ViewContainerRef} from '@angular/core';
import {WindowStoreService} from "../window-store.service";
import {DynamicWindow} from "../dynamic-window";
import {fromEvent, Subscription} from "rxjs";

@Directive({
  selector: '[dw-focusable]'
})
export class FocusableDirective implements AfterViewInit, OnDestroy{

  id: number | undefined;
  element: HTMLElement;
  subscriptions: Subscription[] = [];

  constructor(
    private elementRef: ElementRef,
    private host: ViewContainerRef,
    private windowsService: WindowStoreService<DynamicWindow>
  ) {
    elementRef.nativeElement.classList.add("dw-focusable");
    this.element = elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.id = this.host._hostLView[8].id;
    this.element.style.zIndex = `${this.windowsService.getFocusNumber()}`;
    this.initFocusable();
  }

  private initFocusable() {
    if (this.id != null) {
      let id: number = this.id;
      const focus = fromEvent<MouseEvent>(this.element as HTMLElement, "mousedown");
      const focusSub = focus.subscribe((event: MouseEvent) => {
        this.element.style.zIndex = `${this.windowsService.getFocusNumber()}`;
      });
      this.subscriptions.push.apply(this.subscriptions,[focusSub]);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

}
