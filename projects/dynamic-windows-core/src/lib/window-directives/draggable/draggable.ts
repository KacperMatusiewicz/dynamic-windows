import {fromEvent, Subscription, takeUntil} from "rxjs";
import {ElementRef} from "@angular/core";

export class Draggable {

  private element : HTMLElement;
  private elementHandle : HTMLElement | undefined;
  private draggableSpaceElements: HTMLCollection;
  private nonDraggableElements: HTMLCollection | undefined;
  private subscriptions: Subscription[] = [];


  constructor(
    private elementReference: ElementRef,
    private document: any
  ) {
    this.element = this.elementReference.nativeElement as HTMLElement;
    this.draggableSpaceElements = this.elementReference.nativeElement.getElementsByClassName('dw-draggable-space');
  }

  draggableAfterViewInit(): void {
    if(this.draggableSpaceElements.length == 0) {
      this.elementHandle= this.element;
    } else {
      this.elementHandle = this.draggableSpaceElements.item(0) as HTMLElement;
    }
    this.nonDraggableElements = this.elementHandle.getElementsByClassName("dw-non-draggable-space")
    this.element.style.position = "absolute";
    this.initDrag();
  }

  draggableOnDestroy(): void {
    this.subscriptions.forEach((s) => s?.unsubscribe());
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

  private initDrag() {
    let multipleDragStart = [];
    if(this.draggableSpaceElements.length > 0) {
      for(let i = 0; i < this.draggableSpaceElements.length; i++) {
        const dragStart = fromEvent<MouseEvent>(this.draggableSpaceElements.item(i) as HTMLElement, "mousedown");
        multipleDragStart.push(dragStart);
      }
    } else {
      const dragStart = fromEvent<MouseEvent>(this.elementHandle as HTMLElement, "mousedown");
      multipleDragStart.push(dragStart);
    }
    const dragEnd$ = fromEvent<MouseEvent>(this.document, "mouseup");
    const drag$ = fromEvent<MouseEvent>(this.document, "mousemove").pipe(
      takeUntil(dragEnd$)
    );

    let initialX: number,
      initialY: number,
      currentX = this.parseToNumber(this.element.style.left),
      currentY = this.parseToNumber(this.element.style.top);

    let dragSub: Subscription;

    for(let i = 0; i < multipleDragStart.length; i++) {
      let dragStartSub = multipleDragStart[i].subscribe(
        (event: MouseEvent) => {
          initialX = event.clientX - this.parseToNumber(this.element.style.left);
          initialY = event.clientY - this.parseToNumber(this.element.style.top);
          if(this.checkIfOnNonDraggableElement(event)){
            return;
          }
          this.element.style.cursor = "move";

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
        }
      );
      this.subscriptions.push.apply(this.subscriptions, [dragStartSub])
    }

    const dragEndSub = dragEnd$.subscribe((event: MouseEvent) => {
      initialX = currentX;
      initialY = currentY;
      this.element.classList.remove('dw-free-dragging');
      this.element.style.cursor = "";
      if (dragSub) {
        dragSub.unsubscribe();
      }
    });

    this.subscriptions.push.apply(this.subscriptions, [
      dragSub!,
      dragEndSub,
    ]);
  }
}
