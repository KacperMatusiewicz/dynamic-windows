import {AfterViewInit, Directive, ElementRef, Inject, OnDestroy} from '@angular/core';
import {fromEvent, Subscription, takeUntil} from "rxjs";
import {DOCUMENT} from "@angular/common";

@Directive({
  selector: '[dw-draggable]'
})
export class DraggableDirective implements AfterViewInit, OnDestroy{

  private element : HTMLElement;
  private elementHandle : HTMLElement | undefined;
  private draggableSpaceElements: HTMLCollection;
  private nonDraggableElements: HTMLCollection | undefined;
  private subscriptions: Subscription[] = [];

  constructor(
    private elementReference : ElementRef,
    @Inject(DOCUMENT) private document: any
  ) {
    this.element = this.elementReference.nativeElement as HTMLElement;
    this.draggableSpaceElements = this.elementReference.nativeElement.getElementsByClassName('dw-draggable-space');
  }

  ngAfterViewInit(): void {
    this.elementHandle = this.draggableSpaceElements.item(0) as HTMLElement;
    this.nonDraggableElements = this.elementHandle.getElementsByClassName("dw-non-draggable-space")
    this.element.style.position = "absolute";
    this.initDrag();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s?.unsubscribe());
  }

  private initDrag() {
    const dragStart$ = fromEvent<MouseEvent>(this.elementHandle as HTMLElement, "mousedown");
    const dragEnd$ = fromEvent<MouseEvent>(this.document, "mouseup");
    const drag$ = fromEvent<MouseEvent>(this.document, "mousemove").pipe(
      takeUntil(dragEnd$)
    );

    let initialX: number,
      initialY: number,
      currentX = this.parseToNumber(this.element.style.left),
      currentY = this.parseToNumber(this.element.style.top);

    let dragSub: Subscription;

    const dragStartSub = dragStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - this.parseToNumber(this.element.style.left);
      initialY = event.clientY - this.parseToNumber(this.element.style.top);


      if(this.checkIfOnNonDraggableElement(event)){
        return;
      }

      this.element.classList.add('dw-free-dragging');
      dragSub = drag$.subscribe((event: MouseEvent) => {
        event.preventDefault();

        currentX = event.clientX - initialX;
        currentY = event.clientY - initialY;

        this.element.style.left = currentX + "px";
        this.element.style.top  = currentY + "px";

        if (currentY < 0){
          this.element.style.top  = 0 + "px";
        }
      });
    });

    const dragEndSub = dragEnd$.subscribe((event: MouseEvent) => {
      initialX = currentX;
      initialY = currentY;

      this.element.classList.remove('dw-free-dragging');
      if (dragSub) {
        dragSub.unsubscribe();
      }
    });

    this.subscriptions.push.apply(this.subscriptions, [
      dragStartSub,
      dragSub!,
      dragEndSub,
    ]);
  }

  private checkIfOnNonDraggableElement(event: MouseEvent): boolean{
    if(this.nonDraggableElements !== undefined)
      for(let i: number = 0;  i < this.nonDraggableElements?.length; i++){
        let element = this.nonDraggableElements?.item(i);
        if(event.target === element) {
          return true;
        }
      }
    return  false;
  }

  private parseToNumber(string: string): number {
    let ret = string.length !== 0 ? Number.parseInt(
      string
        .replace("px","")
        .replace("%","")
        .replace("rem", "")
        .replace("em","")
        .replace("pt","")
        .replace("pc","")
        .replace("mm","")
        .replace("cm","")
        .replace("ch","")
        .replace("vw","")
        .replace("vh","")
        .replace("vmin","")
        .replace("vmax","")
        .replace("ex","")
    ) : 0;
    return ret;
  }
}