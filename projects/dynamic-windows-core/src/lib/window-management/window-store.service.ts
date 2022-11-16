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

  public getDisplayWidth(): number{
    return Number.parseInt(getComputedStyle(this.windowContainerRef?.element.nativeElement).width)
  }

  public getDisplayHeight(): number{
    return Number.parseInt(getComputedStyle(this.windowContainerRef?.element.nativeElement).height)
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
    this.focusWindow(w.getId())
  }

  public focusWindow(id: number){
    let window = this.windowList.get(id)
    if (window !== undefined && window.isEntryFocusable()){
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

  public closeWindow(id: number): void {
    if (this.windowList.has(id)){
      const entry = this.windowList.get(id);
      if (entry)
        entry.getInstance().resolveCloseWindowAction()
      this.updateTaskbar();
    }
  }

  public terminate(id: number) : void {
    if (this.windowList.has(id)) {
      const entry = this.windowList.get(id)
      if (entry)
        entry.delete()

      this.removeEntry(id)
      this.windowList.delete(id)
      this.focusFirst()
      this.updateTaskbar()
    }
  }

  public setSize(id: number, x: number, y: number){
    if (this.windowList.has(id)){
      const window = this.windowList.get(id)
      if (window){
        window.setSize(x,y)
      }
    }
  }

  public setPosition(id: number, x: number, y: number){
    if (this.windowList.has(id)){
      const window = this.windowList.get(id)
      if (window){
        window.setPosition(x,y)
      }
    }
  }

  public minimizeWindow(id: number){
    if(this.windowList.has(id)){
      const window = this.windowList.get(id)
      if (window){
        window.minimize()
        if (window === this.getFocusedWindow())
          this.currentlyFocusedEntry = null
      }

      this.updateTaskbar()
    }
  }

  public restoreWindow(id: number){
    if(this.windowList.has(id)){
      const window = this.windowList.get(id)
      if (window){
        window.restore()
      }

      this.updateTaskbar()
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

  public focusFirst(){
    let validId = -1
    if (this.focusStack.length > 0){
      for (let i=0; i<this.focusStack.length; i++){
        let entry = this.focusStack[i]
        if (!entry.isMinimized()){
          validId = this.focusStack[i].getId()
        }
      }

      if (validId !== -1)
        this.focus(this.focusStack[validId])
    }
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



