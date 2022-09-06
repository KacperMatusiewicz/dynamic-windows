import {WindowStoreService} from "./window-store.service";
import {WindowInjector} from "./dynamic-windows-core.module";

export class DynamicWindow {

  id: number | undefined;
  w: WindowStoreService<any>;

  constructor() {
   this.w = WindowInjector.get(WindowStoreService<any>);
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
