import {WindowStoreService} from "./window-management/window-store.service";
import {WindowInjector} from "./dynamic-windows-core.module";
import {ViewOperation} from "./view-operation.decorator";

export abstract class DynamicWindow {

  id: number = -1;
  w: WindowStoreService;
  windowName: string = ""
  windowIconPath: string = ""

  constructor() {
   this.w = WindowInjector.get(WindowStoreService);
  }
  public setId(id: number): void {
    this.id = id;
  }

  public setSize(x: number, y: number){
    this.w.setSize(this.id, x, y)
  }

  public setPosition(x: number, y: number){
    this.w.setPosition(this.id, x, y)
  }

  public toggleMaximize(){
    let entry = this.w.windowList.get(this.id)
    if (entry)
      if (entry.isMaximized()){
        this.unMaximize()
      }else{
        this.maximize()
      }
  }

  public maximize(){
    let window = this.w.windowList.get(this.id)
    if (window){
      window.maximize()
      let x = this.w.getDisplayWidth()
      let y = this.w.getDisplayHeight()
      window.setPosition(0, 0)
      window.setSize(x, y)
    }
  }

  public unMaximize(){
    let window = this.w.windowList.get(this.id)
    if (window){
      window.unMaximize()
    }
  }

  public minimize(): void{
    this.w.minimizeWindow(this.id)
  }

  public restore(): void{
    this.w.restoreWindow(this.id)
  }

  public closeWindow(): void {
    if (this.id !== undefined)
    this.w.closeWindow(this.id);
  }

  public resolveCloseWindowAction(): void {
    if (this.id != null) {
      this.w.terminate(this.id);
    }
  }
}
