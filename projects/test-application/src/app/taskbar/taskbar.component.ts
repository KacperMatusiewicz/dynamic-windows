import {Component, OnInit} from '@angular/core';
import {Taskbar, WindowStoreService} from "dynamic-windows-core";
import {WindowEntry} from "../../../../dynamic-windows-core/src/lib/window-management/window-entry";

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent extends Taskbar implements OnInit{

  constructor(private ws: WindowStoreService) {
    super();
    this.ws.setTaskbar(this);
    this.updateTaskbar();
  }

  public override updateTaskbar(){
    this.entries = Array.from(this.ws.windowList.values());
  }

  public getEntries(): WindowEntry[]{
    return this.entries
  }

  ngOnInit(): void {
  }

  isThisFocused(item: WindowEntry): boolean {
    if (item == this.ws.getFocusedWindow()){
      this.updateTaskbar()
      return true;
    }
    this.updateTaskbar()
    return false;
  }

  focus(item: WindowEntry){
    this.ws.focus(item)
  }
}
