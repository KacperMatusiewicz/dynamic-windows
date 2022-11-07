import {ComponentRef} from "@angular/core";

export abstract class Taskbar {
  public entries: ComponentRef<any>[];

  protected constructor() {
    this.entries = [];
  }

  public abstract updateTaskbar(): void;
}
