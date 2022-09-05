import {WindowType} from "./window-type";

export class WindowDto {
  windowType: WindowType;
  isFocused?: boolean;
  isMaximized?: boolean;
  isMinimized?: boolean;
  isResizable?: boolean;
  isDraggable?: boolean;
  content?: {
    postId?: number | undefined,
    userId?: number | undefined
  };


  constructor(
    windowType: WindowType,
    isFocused: boolean,
    isMaximized: boolean,
    isMinimized: boolean,
    isResizable: boolean,
    isDraggable: boolean,
    content: object
  ) {
    this.windowType = windowType;
    this.isFocused = isFocused;
    this.isMaximized = isMaximized;
    this.isMinimized = isMinimized;
    this.isResizable = isResizable;
    this.isDraggable = isDraggable;
    this.content = content;
  }
}
