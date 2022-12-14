import {WindowStoreService} from "./window-management/window-store.service";
import {WindowInjector} from "./dynamic-windows-core.module";

export class DynamicWindow {

  id: number = -1;
  w: WindowStoreService;

  constructor() {
   this.w = WindowInjector.get(WindowStoreService);
  }
  public setId(id: number): void {
    this.id = id;
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
