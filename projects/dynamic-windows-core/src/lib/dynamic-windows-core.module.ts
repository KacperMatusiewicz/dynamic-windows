import {Injector, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DraggableDirective} from "./window-directives/draggable/draggable.directive";
import {ResizableDirective} from "./window-directives/resizable/resizable.directive";
import {DraggableSpaceDirective} from "./window-directives/draggable/draggable-space.directive";
import {NonDraggableSpaceDirective} from "./window-directives/draggable/non-draggable-space.directive";
import {WindowFrameDirective} from "./window-directives/windowframe/windowframe.directive";
import {FocusableDirective} from "./window-directives/focusable/focusable.directive";
import {WrappingWindow} from "./window-management/wrapping-window";
import {DisplayDirective} from './window-management/display.directive';

export let WindowInjector: Injector;

@NgModule({
  declarations: [
    DraggableDirective,
    ResizableDirective,
    DraggableSpaceDirective,
    NonDraggableSpaceDirective,
    WindowFrameDirective,
    FocusableDirective,
    WrappingWindow,
    DisplayDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DraggableDirective,
    ResizableDirective,
    DraggableSpaceDirective,
    NonDraggableSpaceDirective,
    WindowFrameDirective,
    FocusableDirective,
    WrappingWindow,
    DisplayDirective
  ],
  providers: []
})
export class DynamicWindowsCoreModule {
  constructor(private injector: Injector) {
    WindowInjector = this.injector;
  }
}
