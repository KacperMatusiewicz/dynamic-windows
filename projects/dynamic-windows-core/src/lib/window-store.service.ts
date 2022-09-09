import {ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {DynamicWindow} from "./dynamic-window";
import {SimpleWindowComponent} from "./simple-window/simple-window.component";
import {TypeofExpr} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class WindowStoreService {

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
      this.windowList.set(this.idCounter++, componentRef);
      return componentRef;
    }
    throw new DOMException();
  }

  createWindowFromHtmlElement(element: HTMLElement) : ComponentRef<any> {
    let componentRef: ComponentRef<any>;
    if(this.windowContainerRef !== undefined){
      componentRef = this.windowContainerRef?.createComponent(SimpleWindowComponent);
      componentRef.instance.addHtmlElement(element);
      componentRef.instance.setId(this.idCounter);
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
      componentRef.location.nativeElement.remove();
      this.windowList.delete(id);
    }
  }

  public getFocusNumber() : number {
    return ++this.currentZIndex;
  }
}



