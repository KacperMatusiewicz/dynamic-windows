import {ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {TaskbarService} from "./taskbar.service";
import {DynamicWindow} from "./dynamic-window";
import {DynamicWindowsCoreComponent} from "./dynamic-windows-core.component";

@Injectable({
  providedIn: 'root'
})
export class WindowStoreService<T extends DynamicWindow> {
  //do zastanowienia:
  taskbarService: TaskbarService | null;

  setTaskbar(taskbarService: TaskbarService) {
    if(taskbarService === null) {
      this.useTaskbar = true;
    } else {
      this.useTaskbar = false;
    }
    this.taskbarService = taskbarService;
  }



  currentZIndex: number;
  idCounter: number;

  windowContainerRef : ViewContainerRef | undefined;
  windowList:  Map<Number, HTMLElement>;

  private useTaskbar: boolean = false;
  constructor() {
    this.windowList = new Map();
    this.currentZIndex = 0;
    this.taskbarService = null;
    this.idCounter = 0;
  }

  setWindowContainerRef(windowContainerRef: ViewContainerRef) {
    this.windowContainerRef = windowContainerRef;
  }

  createWindow(cls: Type<T>) : void {
    let componentRef: ComponentRef<any>;
    if(this.windowContainerRef !== undefined){
      componentRef = this.windowContainerRef?.createComponent(cls);
      this.windowList.set(this.idCounter++, componentRef.location.nativeElement);
      console.log("no elo");
    }
  }

  closeWindow(id: number): void {

  }
}



