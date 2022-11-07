import {Component, ComponentRef, OnInit} from '@angular/core';
import {Taskbar, WindowStoreService} from "dynamic-windows-core";

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

  ngOnInit(): void {
  }

  isThisFocused(item: ComponentRef<any>): boolean {
    if (item.location.nativeElement.firstChild == this.ws.getFocusedWindow()){
      this.updateTaskbar()
      return true;
    }
    this.updateTaskbar()
    return false;
  }
}
