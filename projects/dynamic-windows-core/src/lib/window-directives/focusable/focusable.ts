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
    private windowsService: WindowStoreService,
  ) {
    this.element = elementRef.nativeElement;
    this.element.classList.add("dw-focusable");
  }

  focusableAfterViewInit(): void {
    // @ts-ignore
    this.id = this.host._hostLView[8].id;
    this.changeFocus();
    this.initFocusable();
  }

  focusableOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private initFocusable() {
    if (this.id != null) {
      const focus = fromEvent<MouseEvent>(this.element as HTMLElement, "mousedown");
      const focusSub = focus.subscribe((event: MouseEvent) => {
        this.changeFocus();
      });
      this.subscriptions.push.apply(this.subscriptions,[focusSub]);
    }
  }

  private changeFocus() {
    if (this.id !== undefined)
      this.windowsService.focusWindow(this.id);
  }
}
