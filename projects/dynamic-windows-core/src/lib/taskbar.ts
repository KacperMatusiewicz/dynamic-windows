import {ComponentRef} from "@angular/core";
import {WindowEntry} from "./window-management/window-entry";

export abstract class Taskbar {
  public entries: WindowEntry[];

  protected constructor() {
    this.entries = [];
  }

  public abstract updateTaskbar(): void;
}
