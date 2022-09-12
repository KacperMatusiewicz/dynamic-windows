import {Injector, NgModule} from '@angular/core';
import {WindowStoreService} from "./window-store.service";
import {SimpleWindowComponent} from './simple-window/simple-window.component';
import {DraggableDirective} from './draggable/draggable.directive';
import {ResizableDirective} from './resizable/resizable.directive';
import {CommonModule} from "@angular/common";
import {DraggableSpaceDirective} from './draggable/draggable-space.directive';
import {NonDraggableSpaceDirective} from './draggable/non-draggable-space.directive';
import {WindowFrameDirective} from './windowframe/windowframe.directive';
import {FocusableDirective} from './focusable/focusable.directive';

export let WindowInjector: Injector;

@NgModule({
  declarations: [
    SimpleWindowComponent,
    DraggableDirective,
    ResizableDirective,
    DraggableSpaceDirective,
    NonDraggableSpaceDirective,
    WindowFrameDirective,
    FocusableDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SimpleWindowComponent,
    DraggableDirective,
    ResizableDirective,
    DraggableSpaceDirective,
    NonDraggableSpaceDirective,
    WindowFrameDirective,
    FocusableDirective
  ],
  providers: [
    WindowStoreService
  ]
})
export class DynamicWindowsCoreModule {

  constructor(private injector: Injector) {
    WindowInjector = this.injector;
  }
}
