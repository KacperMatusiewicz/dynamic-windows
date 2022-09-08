import {AfterViewInit, Directive, ElementRef, Inject} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {fromEvent, Subscription, takeUntil} from "rxjs";

@Directive({
  selector: '[dw-resizable]'
})
export class ResizableDirective implements AfterViewInit{
  element: HTMLElement;

  topHandle: HTMLElement | undefined;
  leftHandle: HTMLElement | undefined;
  rightHandle: HTMLElement | undefined;
  bottomHandle: HTMLElement | undefined;
  topLeftHandle: HTMLElement | undefined;
  topRightHandle: HTMLElement | undefined;
  bottomLeftHandle: HTMLElement | undefined;
  bottomRightHandle: HTMLElement | undefined;

  resizingMethod: any;

  private subscriptions: Subscription[] = [];

  constructor(
    private elementReference : ElementRef,
    @Inject(DOCUMENT) private document: any
  ) {
    this.element = elementReference.nativeElement as HTMLElement;

  }

  ngAfterViewInit(): void {
    let barW = 10;
    this.topHandle = this.createAnchor("dw-resize-anchor-t", true, -(barW/2),true, barW/2, `calc(100% - ${barW}px)`, `${barW}px`, "ns-resize");
    this.leftHandle = this.createAnchor("dw-resize-anchor-l",true, barW/2,true, -(barW/2), `${barW}px`, `calc(100% - ${barW}px)`, "ew-resize");
    this.rightHandle = this.createAnchor("dw-resize-anchor-r",true, (barW/2),false, -(barW/2), `${barW}px`, `calc(100% - ${barW}px)`, "ew-resize");
    this.bottomHandle = this.createAnchor("dw-resize-anchor-b", false, -(barW/2), true, barW/2, `calc(100% - ${barW}px)`, `${barW}px`, "ns-resize");

    this.topLeftHandle = this.createAnchor("dw-resize-anchor-tl",true, -(barW/2),true, -(barW/2), `${barW}px`, `${barW}px`, "nwse-resize");
    this.topRightHandle = this.createAnchor("dw-resize-anchor-tr",true, -(barW/2),false, -(barW/2), `${barW}px`, `${barW}px`, "nesw-resize");
    this.bottomLeftHandle = this.createAnchor("dw-resize-anchor-bl",false, -(barW/2),true, -(barW/2), `${barW}px`, `${barW}px`, "nesw-resize");
    this.bottomRightHandle = this.createAnchor("dw-resize-anchor-br",false, -(barW/2),false, -(barW/2), `${barW}px`, `${barW}px`, "nwse-resize");

    this.addCreatedAnchors();
    this.initResize()
  }

  private initResize() {
    const topResizeStart$ = fromEvent<MouseEvent>(this.topHandle as HTMLElement, "mousedown");
    const leftResizeStart$ = fromEvent<MouseEvent>(this.leftHandle as HTMLElement, "mousedown");
    const rightResizeStart$ = fromEvent<MouseEvent>(this.rightHandle as HTMLElement, "mousedown");
    const bottomResizeStart$ = fromEvent<MouseEvent>(this.bottomHandle as HTMLElement, "mousedown");
    const topLeftResizeStart$ = fromEvent<MouseEvent>(this.topLeftHandle as HTMLElement, "mousedown");
    const topRightResizeStart$ = fromEvent<MouseEvent>(this.topRightHandle as HTMLElement, "mousedown");
    const bottomLeftResizeStart$ = fromEvent<MouseEvent>(this.bottomLeftHandle as HTMLElement, "mousedown");
    const bottomRightResizeStart$ = fromEvent<MouseEvent>(this.bottomRightHandle as HTMLElement, "mousedown");

    const resizeEnd$ = fromEvent<MouseEvent>(this.document, "mouseup");
    const resize$ = fromEvent<MouseEvent>(this.document, "mousemove").pipe(
      takeUntil(resizeEnd$)
    );

    let initialX: number,
      initialY: number,
      initialWidth: number,
      initialHeight: number,
      currentX = 0,
      currentY = 0;

    let resizeSub: Subscription;

    const resizeRightStartSub = rightResizeStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - currentX /*+ this.element.clientWidth*/;
      initialY = event.clientY - currentY;
      initialWidth = this.element.clientWidth;
      initialHeight = this.element.clientHeight;
      this.element.classList.add('dw-resizing');
      this.resizingMethod = this.resizeRight(initialX, initialY, initialWidth, initialHeight);
      resizeSub = resize$.subscribe((event: MouseEvent) => {
        this.resizingMethod(event);
      });
    });

    const resizeLeftStartSub = leftResizeStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - currentX /*+ this.element.clientWidth*/;
      initialY = event.clientY - currentY;
      initialWidth = this.element.clientWidth;
      initialHeight = this.element.clientHeight;
      this.element.classList.add('dw-resizing');
      this.resizingMethod = this.resizeLeft
      (initialX, initialY, initialWidth, initialHeight);
      resizeSub = resize$.subscribe((event: MouseEvent) => {
        this.resizingMethod(event);
      });
    });

    const resizeBottomStartSub = bottomResizeStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - currentX /*+ this.element.clientWidth*/;
      initialY = event.clientY - currentY;
      initialWidth = this.element.clientWidth;
      initialHeight = this.element.clientHeight;
      this.element.classList.add('dw-resizing');
      this.resizingMethod = this.resizeBottom(initialX, initialY, initialWidth, initialHeight);
      resizeSub = resize$.subscribe((event: MouseEvent) => {
        this.resizingMethod(event);
      });
    });

    const resizeTopStartSub = topResizeStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - currentX /*+ this.element.clientWidth*/;
      initialY = event.clientY - currentY;
      initialWidth = this.element.clientWidth;
      initialHeight = this.element.clientHeight;
      this.element.classList.add('dw-resizing');
      this.resizingMethod = this.resizeTop(initialX, initialY, initialWidth, initialHeight);
      resizeSub = resize$.subscribe((event: MouseEvent) => {
        this.resizingMethod(event);
      });
    });

    const resizeLeftTopStartSub = topLeftResizeStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - currentX /*+ this.element.clientWidth*/;
      initialY = event.clientY - currentY;
      initialWidth = this.element.clientWidth;
      initialHeight = this.element.clientHeight;
      this.element.classList.add('dw-resizing');
      this.resizingMethod = this.resizeLeftTop(initialX, initialY, initialWidth, initialHeight);
      resizeSub = resize$.subscribe((event: MouseEvent) => {
        this.resizingMethod(event);
      });
    });

    const resizeRightTopStartSub = topRightResizeStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - currentX /*+ this.element.clientWidth*/;
      initialY = event.clientY - currentY;
      initialWidth = this.element.clientWidth;
      initialHeight = this.element.clientHeight;
      this.element.classList.add('dw-resizing');
      this.resizingMethod = this.resizeRightTop(initialX, initialY, initialWidth, initialHeight);
      resizeSub = resize$.subscribe((event: MouseEvent) => {
        this.resizingMethod(event);
      });
    });

    const resizeLeftBottomStartSub = bottomLeftResizeStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - currentX /*+ this.element.clientWidth*/;
      initialY = event.clientY - currentY;
      initialWidth = this.element.clientWidth;
      initialHeight = this.element.clientHeight;
      this.element.classList.add('dw-resizing');
      this.resizingMethod = this.resizeLeftBottom(initialX, initialY, initialWidth, initialHeight);
      resizeSub = resize$.subscribe((event: MouseEvent) => {
        this.resizingMethod(event);
      });
    });

    const resizeRightBottomStartSub = bottomRightResizeStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - currentX /*+ this.element.clientWidth*/;
      initialY = event.clientY - currentY;
      initialWidth = this.element.clientWidth;
      initialHeight = this.element.clientHeight;
      this.element.classList.add('dw-resizing');
      this.resizingMethod = this.resizeRightBottom(initialX, initialY, initialWidth, initialHeight);
      resizeSub = resize$.subscribe((event: MouseEvent) => {
        this.resizingMethod(event);
      });
    });

    const resizeEndSub = resizeEnd$.subscribe((event: MouseEvent) => {
      initialX = currentX;
      initialY = currentY;

      this.element.classList.remove('dw-resizing');
      if (resizeSub) {
        resizeSub.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s?.unsubscribe());
  }

  resizeRight(initialX: number, initialY: number, initialWidth: number, initialHeight: number) {
    return (event: MouseEvent)=>{
      let currentX = event.clientX - initialX;
      this.element.style.width = currentX + initialWidth + "px";
    };
  }

  resizeLeft(initialX: number, initialY: number, initialWidth: number, initialHeight: number) {
    return (event: MouseEvent)=>{
      let minSize = this.getMinWidthSize();
      if(event.clientX < initialX + initialWidth - minSize){
        this.element.style.left = event.clientX + 'px';
        this.element.style.width = initialWidth - (event.clientX - initialX) + "px";
      }
    };
  }

  resizeBottom(initialX: number, initialY: number, initialWidth: number, initialHeight: number) {
    return (event: MouseEvent)=>{
      let currentY = event.clientY - initialY;
      this.element.style.height = currentY + initialHeight + "px";
    };
  }

  resizeTop(initialX: number, initialY: number, initialWidth: number, initialHeight: number) {
    return (event: MouseEvent)=>{
      let minSize = this.getMinHeightSize();
      if(event.clientY < initialY + initialHeight - minSize){
        this.element.style.top = event.clientY + 'px';
        this.element.style.height = initialHeight - (event.clientY - initialY) + "px";
      }
    };
  }

  resizeLeftTop(initialX: number, initialY: number, initialWidth: number, initialHeight: number) {
    return (event: MouseEvent)=>{
      let minSizeX = this.getMinWidthSize();
      if(event.clientX < initialX + initialWidth - minSizeX){
        this.element.style.left = event.clientX + 'px';
        this.element.style.width = initialWidth - (event.clientX - initialX) + "px";
      }
      let minSizeY = this.getMinHeightSize();
      if(event.clientY < initialY + initialHeight - minSizeY){
        this.element.style.top = event.clientY + 'px';
        this.element.style.height = initialHeight - (event.clientY - initialY) + "px";
      }
    };
  }

  resizeRightTop(initialX: number, initialY: number, initialWidth: number, initialHeight: number) {
    return (event: MouseEvent)=>{
      let currentX = event.clientX - initialX;
      this.element.style.width = currentX + initialWidth + "px";
      let minSize = this.getMinHeightSize();
      if(event.clientY < initialY + initialHeight - minSize){
        this.element.style.top = event.clientY + 'px';
        this.element.style.height = initialHeight - (event.clientY - initialY) + "px";
      }
    };
  }

  resizeLeftBottom(initialX: number, initialY: number, initialWidth: number, initialHeight: number) {
    return (event: MouseEvent)=>{
      let currentY = event.clientY - initialY;
      this.element.style.height = currentY + initialHeight + "px";
      let minSize = this.getMinWidthSize();
      if(event.clientX < initialX + initialWidth - minSize){
        this.element.style.left = event.clientX + 'px';
        this.element.style.width = initialWidth - (event.clientX - initialX) + "px";
      }
    };
  }

  resizeRightBottom(initialX: number, initialY: number, initialWidth: number, initialHeight: number) {
    return (event: MouseEvent)=>{
      let currentX = event.clientX - initialX;
      this.element.style.width = currentX + initialWidth + "px";
      let currentY = event.clientY - initialY;
      this.element.style.height = currentY + initialHeight + "px";
    };
  }

  private addCreatedAnchors(){

    // @ts-ignore
    this.element.appendChild(this.topHandle);
    // @ts-ignore
    this.element.appendChild(this.rightHandle);
    // @ts-ignore
    this.element.appendChild(this.leftHandle);
    // @ts-ignore
    this.element.appendChild(this.bottomHandle);
    // @ts-ignore
    this.element.appendChild(this.topLeftHandle);
    // @ts-ignore
    this.element.appendChild(this.topRightHandle);
    // @ts-ignore
    this.element.appendChild(this.bottomLeftHandle)
    // @ts-ignore
    this.element.appendChild(this.bottomRightHandle)

  }


  private createAnchor(className: string, isTop: boolean, topOrBottom: number, isLeft:boolean, leftOrRight: number, width: string, height: string, cursor: string): HTMLElement {
    let tmp = document.createElement("div");
    tmp.classList.add("dw-resize-anchor");
    tmp.classList.add("dw-non-draggable-space");
    tmp.classList.add(className);
    tmp.style.position = "absolute";

    if(isTop){
      tmp.style.top = topOrBottom + "px";
    } else {
      tmp.style.bottom = topOrBottom + "px";
    }

    if (isLeft) {
      tmp.style.left = leftOrRight + "px";
    } else {
      tmp.style.right = leftOrRight + "px";
    }

    //tmp.style.backgroundColor = "red";
    tmp.style.width = width;
    //tmp.style.opacity = "0.5";
    tmp.style.height = height;
    tmp.style.cursor = cursor;
    return tmp;
  }

  getMinWidthSize(): number {
    if(this.element.style.minWidth.length>0 && this.element.style.minWidth !== "fit-content"){
      return this.parseToNumber(this.element.style.minWidth);
    }
    return 0;
  }

  getMinHeightSize(): number {
    if(this.element.style.minHeight.length>0 && this.element.style.minHeight !== "fit-content"){
      return this.parseToNumber(this.element.style.minHeight);
    }
    return 0;
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
