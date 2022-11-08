import {WindowEntry} from "./window-management/window-entry";
import {WindowStoreService} from "./window-management/window-store.service";
import {WindowInjector} from "./dynamic-windows-core.module";

export abstract class Taskbar {
  public entries: WindowEntry[]
  public ws: WindowStoreService

  protected constructor() {
    this.entries = []
    this.ws = WindowInjector.get(WindowStoreService)
    this.ws.setTaskbar(this)
    this.updateTaskbar()
  }

  public getEntries(): WindowEntry[]{
    return this.entries
  }

  public updateTaskbar() {
    this.entries = Array.from(this.ws.windowList.values())
  }

  public isEntryFocused(entry: WindowEntry): boolean {
    let result: boolean = false
    if (entry === this.ws.getFocusedWindow()){
      result = true
    }else{
      result = false
    }
    this.updateTaskbar()
    return result
  }
}
