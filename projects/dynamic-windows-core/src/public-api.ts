/*
 * Public API Surface of dynamic-windows-core
 */

export * from './lib/dynamic-windows-core.module';

export {DraggableDirective} from "./lib/window-directives/draggable/draggable.directive";
export {DraggableSpaceDirective} from "./lib/window-directives/draggable/draggable-space.directive";
export {NonDraggableSpaceDirective} from "./lib/window-directives/draggable/non-draggable-space.directive";
export {ResizableDirective} from "./lib/window-directives/resizable/resizable.directive";
export {WindowStoreService}  from './lib/window-management/window-store.service';
export {FocusableDirective} from "./lib/window-directives/focusable/focusable.directive";
export {WindowFrameDirective} from "./lib/window-directives/windowframe/windowframe.directive";
export {DisplayDirective} from './lib/window-management/display.directive';

export {DynamicWindow} from './lib/dynamic-window';
export {Taskbar} from './lib/taskbar';
export {WrappingWindow} from './lib/window-management/wrapping-window';
export {WindowEntry} from './lib/window-management/window-entry';

export {ViewOperation} from "./lib/view-operation.decorator";
