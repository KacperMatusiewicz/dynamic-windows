import {DynamicWindow} from "./dynamic-window";
import {AfterViewInit, Component} from "@angular/core";

@Component({
  selector: "base-wrapping-window",
  template: ""
})
export abstract class WrappingWindow extends DynamicWindow implements AfterViewInit{
  abstract addHtmlElement(element: HTMLElement): void;
  abstract appendChild(): void
  ngAfterViewInit(): void {
    this.appendChild();
  }
}
