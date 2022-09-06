import {Injector, NgModule} from '@angular/core';
import {WindowStoreService} from "./window-store.service";
import {SimpleWindowComponent} from './simple-window/simple-window.component';

export let WindowInjector: Injector;

@NgModule({
  declarations: [
    SimpleWindowComponent
  ],
  imports: [],
  exports: [],
  providers: [
    WindowStoreService
  ]
})
export class DynamicWindowsCoreModule {

  constructor(private injector: Injector) {
    WindowInjector = this.injector;
  }
}
