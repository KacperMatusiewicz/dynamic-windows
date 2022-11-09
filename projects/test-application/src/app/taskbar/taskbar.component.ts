import {Component, OnInit} from '@angular/core';
import {Taskbar, WindowEntry} from "dynamic-windows-core";


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
    if (item === this.ws.getFocusedWindow()){
      item.getInstance().minimize()
    }else{
      item.getInstance().restore()
      this.ws.focus(item)
    }
  }
}
