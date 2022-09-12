import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {WrappingWindow} from "../wrapping-window";

@Component({
  selector: 'simple-window',
  templateUrl: './simple-window.component.html',
  styleUrls: ['./simple-window.component.css']
})
export class SimpleWindowComponent extends WrappingWindow implements AfterViewInit{
  element: Node | undefined;

  @ViewChild("container")
  container!: ElementRef;

  windowTitle: string = "";

  constructor() {
    super();
  }

  setTitle(windowTitle: string){
    this.windowTitle = windowTitle;
  }

  public addHtmlElement(element: HTMLElement) {
    this.element = element.cloneNode(true);
  }

  appendChild(): void {
    if (this.element !== undefined) {
      this.container.nativeElement.appendChild(this.element);
    }
  }



}
