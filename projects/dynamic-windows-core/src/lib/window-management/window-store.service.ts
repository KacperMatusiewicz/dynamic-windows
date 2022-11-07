import {ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {DynamicWindow} from "../dynamic-window";
import {WrappingWindow} from "./wrapping-window";
import {Taskbar} from "../taskbar";


@Injectable({
  providedIn: 'root'
})
export class WindowStoreService {

  currentlyFocusedHtmlElement: HTMLElement | null = null;
  currentZIndex: number;
  idCounter: number;
  private taskBar!: any

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
      this.updateTaskbar();
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
        this.updateTaskbar();
        return componentRef;
      }
    throw new DOMException();
  }


  closeWindow(id: number): void {
    if (this.windowList.has(id)){
      // @ts-ignore
      const componentRef: ComponentRef<any> = this.windowList.get(id);
      componentRef.instance.resolveCloseWindowAction();
      this.updateTaskbar();
    }

  }

  terminate(id: number) : void {
    if (this.windowList.has(id)) {
      // @ts-ignore
      const componentRef: ComponentRef<any> = this.windowList.get(id);
      this.clearFocusWhileClosing(componentRef);

      componentRef.location.nativeElement.remove();
      this.windowList.delete(id);
      this.updateTaskbar();
    }
  }

  clearFocusWhileClosing(componentRef: ComponentRef<any>) {
    const el: HTMLElement = componentRef.location.nativeElement as HTMLElement;
    if (el.getElementsByClassName("dw-focusable").item(0) === this.currentlyFocusedHtmlElement) {
      this.currentlyFocusedHtmlElement = null;
      this.updateTaskbar();
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

  private updateTaskbar(){
    if (this.taskBar){
      this.taskBar.updateTaskbar();
    }
  }

  public setTaskbar<T extends Taskbar>(taskbar: T){
    this.taskBar = taskbar
  }
}



