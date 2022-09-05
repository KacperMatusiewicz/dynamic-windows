import { Component, OnInit } from '@angular/core';
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

}
