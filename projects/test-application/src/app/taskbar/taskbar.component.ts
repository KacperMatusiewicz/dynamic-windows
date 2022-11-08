import {Component, OnInit} from '@angular/core';
import {Taskbar} from "dynamic-windows-core";
import {WindowEntry} from "../../../../dynamic-windows-core/src/lib/window-management/window-entry";

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent extends Taskbar implements OnInit{

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  public focus(item: WindowEntry){
    this.ws.focus(item)
  }
}
