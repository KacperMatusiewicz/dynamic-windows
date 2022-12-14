import {ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {DynamicWindow} from "../dynamic-window";
import {WrappingWindow} from "./wrapping-window";


@Injectable({
  providedIn: 'root'
})
export class WindowStoreService {

  currentlyFocusedHtmlElement: HTMLElement | null = null;
  currentZIndex: number;
  idCounter: number;

  windowContainerRef : ViewContainerRef | undefined;
  windowList:  Map<Number, ComponentRef<any>>;

  constructor() {
    this.windowList = new Map();
    this.currentZIndex = 0;
    this.idCounter = 0;
  }

  setWindowContainerRef(windowContainerRef: ViewContainerRef) {
    this.windowContainerRef = windowContainerRef;
    this.windowContainerRef.element.nativeElement.style.position = "relative";
  }

   createWindow<T extends DynamicWindow>(cls: Type<T>): ComponentRef<T> {
    let componentRef: ComponentRef<T>;
    if(this.windowContainerRef !== undefined) {
      componentRef = this.windowContainerRef?.createComponent(cls);
      componentRef.instance.setId(this.idCounter);
      this.windowContainerRef.element.nativeElement.appendChild(componentRef.location.nativeElement as HTMLElement);
      this.windowList.set(this.idCounter++, componentRef);
      return componentRef;
    }
    throw new DOMException();
  }

  createWindowFromHtmlElement<T extends WrappingWindow>(element: HTMLElement, wrapperComponent: Type<T> ) : ComponentRef<T> {
    let componentRef: ComponentRef<any>;
      if(this.windowContainerRef !== undefined){
        componentRef = this.windowContainerRef?.createComponent(wrapperComponent);
        componentRef.instance.addHtmlElement(element);
        componentRef.instance.setId(this.idCounter);
        this.windowContainerRef.element.nativeElement.appendChild(componentRef.location.nativeElement as HTMLElement);
        this.windowList.set(this.idCounter++, componentRef);
        return componentRef;
      }
    throw new DOMException();
  }


  closeWindow(id: number): void {
    if (this.windowList.has(id)){
      // @ts-ignore
      const componentRef: ComponentRef<any> = this.windowList.get(id);
      componentRef.instance.resolveCloseWindowAction();
    }

  }

  terminate(id: number) : void {
    if (this.windowList.has(id)) {
      // @ts-ignore
      const componentRef: ComponentRef<any> = this.windowList.get(id);
      this.clearFocusWhileClosing(componentRef);

      componentRef.location.nativeElement.remove();
      this.windowList.delete(id);
    }
  }

  clearFocusWhileClosing(componentRef: ComponentRef<any>) {
    const el: HTMLElement = componentRef.location.nativeElement as HTMLElement;
    if (el.getElementsByClassName("dw-focusable").item(0) === this.currentlyFocusedHtmlElement) {
      this.currentlyFocusedHtmlElement = null;
    }
  }
  public getFocusNumber() : number {
    return ++this.currentZIndex;
  }

  public getFocusedWindow(): HTMLElement | null{

    return this.currentlyFocusedHtmlElement
  }

  public updateCurrentlyFocusedWindow(element: HTMLElement) {
    this.currentlyFocusedHtmlElement = element;
  }

}



