import {fromEvent, Subscription} from "rxjs";
import {ElementRef, ViewContainerRef} from "@angular/core";
import {WindowStoreService} from "../../window-management/window-store.service";


export class Focusable {

  id: number | undefined;
  element: HTMLElement;
  subscriptions: Subscription[] = [];

  constructor(
    private elementRef: ElementRef,
    private host: ViewContainerRef,
    private windowsService: WindowStoreService
  ) {
    elementRef.nativeElement.classList.add("dw-focusable");
    this.element = elementRef.nativeElement;
  }

  focusableAfterViewInit(): void {
    // @ts-ignore
    this.id = this.host._hostLView[8].id;
    this.element.style.zIndex = `${this.windowsService.getFocusNumber()}`;
    this.initFocusable();
  }

  private initFocusable() {
    if (this.id != null) {
      const focus = fromEvent<MouseEvent>(this.element as HTMLElement, "mousedown");
      const focusSub = focus.subscribe((event: MouseEvent) => {
        this.element.style.zIndex = `${this.windowsService.getFocusNumber()}`;
      });
      this.subscriptions.push.apply(this.subscriptions,[focusSub]);
    }
  }

  focusableOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

}
