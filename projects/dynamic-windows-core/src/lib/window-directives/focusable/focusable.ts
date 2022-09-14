import {fromEvent, Subscription} from "rxjs";
import {ComponentRef, ElementRef, ViewContainerRef} from "@angular/core";
import {WindowStoreService} from "../../window-management/window-store.service";


export class Focusable {

  id: number | undefined;
  element: HTMLElement;
  subscriptions: Subscription[] = [];
  private recursiveMarking: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private host: ViewContainerRef,
    private windowsService: WindowStoreService,
  ) {
    this.element = elementRef.nativeElement;
    this.element.classList.add("dw-focusable");
  }

  setRecursiveMarking(recursiveMarking: string) : void {
    if(recursiveMarking === 'true') {
      this.recursiveMarking = true;
    }
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
    if(this.windowsService.getFocusedWindow() !== null && !this.element.classList.contains('dw-focused')) {
      this.unfocusCurrentlyFocusedWindow();
    }
    if(!this.element.classList.contains('dw-focused')) {
      this.element.classList.add('dw-focused')
      this.element.style.zIndex = `${this.windowsService.getFocusNumber()}`;
      this.windowsService.updateCurrentlyFocusedWindow(this.element);
    }

  }

  private unfocusCurrentlyFocusedWindow() {
    let focused = this.windowsService.getFocusedWindow();
    if (focused !== null){
      this.removeFocusedClass(focused);
    }
  }

  private removeFocusedClass(el: HTMLElement) {
    if(!this.recursiveMarking) {
      el.classList.remove('dw-focused');
    } else {
      console.log("recursive marking to be implemented yet");
    }
  }
}
