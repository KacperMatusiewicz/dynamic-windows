import {WindowStoreService} from "./window-management/window-store.service";
import {WindowInjector} from "./dynamic-windows-core.module";

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
