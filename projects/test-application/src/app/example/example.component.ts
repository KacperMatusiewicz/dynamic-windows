import {Component, OnInit} from '@angular/core';
import {DynamicWindow} from "../../../../dynamic-windows-core/src/lib/dynamic-window";

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent extends DynamicWindow implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  override resolveCloseWindowAction() {
    if (window.confirm("Are you sure?")){

      if (this.id != null) {
        this.w.terminate(this.id)
      }

    }
  }

}
