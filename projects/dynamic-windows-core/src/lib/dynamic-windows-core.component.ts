import { Component, OnInit } from '@angular/core';
import {DynamicWindowsCoreService} from "./dynamic-windows-core.service";
import {DynamicWindow} from "./dynamic-window";

@Component({
  selector: 'lib-dynamic-windows-core',
  template: `
    <p>
      dynamic-windows-core works!
    </p>
  `,
  styles: [
  ]
})
export class DynamicWindowsCoreComponent extends DynamicWindow implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  open() {
  }
}
