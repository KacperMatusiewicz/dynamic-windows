import {ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {DynamicWindow} from "../dynamic-window";
import {WrappingWindow} from "./wrapping-window";
import {Taskbar} from "../taskbar";
import {WindowEntry} from "./window-entry";


@Injectable({
  providedIn: 'root'
})
export class WindowStoreService {

  currentlyFocusedEntry: WindowEntry | null = null;
  idCounter: number;
  private taskBar!: Taskbar

  windowContainerRef : ViewContainerRef | undefined;
  windowList:  Map<Number, WindowEntry>;
  focusStack: WindowEntry[]

  constructor() {
    this.windowList = new Map();
    this.idCounter = 0;
    this.focusStack = []
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

      let entry = new WindowEntry(componentRef);
      this.windowList.set(this.idCounter++, entry);
      this.addEntry(entry)

      this.updateTaskbar();
      return componentRef;
    }
    throw new DOMException();
  }

  private addEntry(entry: WindowEntry){
    this.focusStack.unshift(entry)
    this.updateZOrder()
  }

  createWindowFromHtmlElement<T extends WrappingWindow>(element: HTMLElement, wrapperComponent: Type<T> ) : ComponentRef<T> {
    let componentRef: ComponentRef<any>;
      if(this.windowContainerRef !== undefined){
        componentRef = this.windowContainerRef?.createComponent(wrapperComponent);
        componentRef.instance.addHtmlElement(element);
        componentRef.instance.setId(this.idCounter);
        this.windowContainerRef.element.nativeElement.appendChild(componentRef.location.nativeElement as HTMLElement);

        let entry = new WindowEntry(componentRef);
        this.windowList.set(this.idCounter++, entry);
        this.addEntry(entry)

        this.updateTaskbar();
        return componentRef;
      }
    throw new DOMException();
  }

  public focus(w: WindowEntry){
    this.focusWindow(w.component.instance.id)
  }

  public focusWindow(id: number){
    let window = this.windowList.get(id)
    if (window !== undefined){
      this.windowList.forEach((we, k) => {
        if (k !== id)
          we.unfocus()
      })

      this.removeEntry(id)
      this.addEntry(window)
      window.focus();
      this.currentlyFocusedEntry = window
      if (this.taskBar)
        this.updateTaskbar()
    }
  }

  closeWindow(id: number): void {
    if (this.windowList.has(id)){
      // @ts-ignore
      const entry = this.windowList.get(id);
      if (entry)
        entry.component.instance.resolveCloseWindowAction()
      this.updateTaskbar();
    }
  }

  private removeEntry(id: number){
    let index = this.focusStack.findIndex((w) => w.hasId(id))
    if (index !== -1)
      this.focusStack.splice(index, 1)

  }

  private updateZOrder(){
    let z = this.focusStack.length+1
    this.focusStack.forEach((w)=>{
      w.setZIndex(z)
      z--
    })
  }

  terminate(id: number) : void {
    if (this.windowList.has(id)) {
      const entry = this.windowList.get(id);
      if (entry)
        entry.delete()

      this.removeEntry(id)
      this.windowList.delete(id);
      this.focusFirst()
      this.updateTaskbar();
    }
  }

  public focusFirst(){
    if (this.focusStack.length > 0)
      this.focus(this.focusStack[0])
  }

  public getFocusedWindow(): WindowEntry | null{
    return this.currentlyFocusedEntry
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



