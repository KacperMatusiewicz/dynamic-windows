import {ComponentRef} from "@angular/core";
import {WindowEntry} from "./window-management/window-entry";
import {WindowStoreService} from "./window-management/window-store.service";
import {WindowInjector} from "./dynamic-windows-core.module";

export abstract class Taskbar {
  public entries: WindowEntry[];
  public ws: WindowStoreService

  protected constructor() {
    this.entries = [];
    this.ws = WindowInjector.get(WindowStoreService);
    this.ws.setTaskbar(this)
  }

  public abstract updateTaskbar(): void;
}
