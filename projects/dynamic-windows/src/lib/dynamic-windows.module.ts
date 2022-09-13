import { NgModule } from '@angular/core';
import {SimpleWindowComponent} from "./simple-window/simple-window.component";
import {DynamicWindowsCoreModule} from "dynamic-windows-core";



@NgModule({
  declarations: [
    SimpleWindowComponent
  ],
  imports: [
    DynamicWindowsCoreModule
  ],
  exports: [
    SimpleWindowComponent
  ]
})
export class DynamicWindowsModule { }
