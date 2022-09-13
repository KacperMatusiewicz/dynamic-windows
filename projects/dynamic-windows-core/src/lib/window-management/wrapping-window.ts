import {DynamicWindow} from "../dynamic-window";
import {AfterViewInit, Component} from "@angular/core";

@Component({
  selector: "base-wrapping-window",
  template: ""
})
export class WrappingWindow extends DynamicWindow implements AfterViewInit{

  constructor() {
    super();
  }

  addHtmlElement(element: HTMLElement): void {
    throw new Error(`You must override addHtmlElement() method when extending WrappingWindow: ${this}`);
  }

  appendChild(): void{
    throw new Error(`You must override appendChild() method when extending WrappingWindow: ${this}`);
  }

  ngAfterViewInit(): void {
    this.appendChild();
  }
}
