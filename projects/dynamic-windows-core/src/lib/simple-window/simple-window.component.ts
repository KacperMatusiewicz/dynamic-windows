import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {DynamicWindow} from "../dynamic-window";

@Component({
  selector: 'simple-window',
  templateUrl: './simple-window.component.html',
  styleUrls: ['./simple-window.component.css']
})
export class SimpleWindowComponent extends DynamicWindow implements AfterViewInit {

  element: Node | undefined;

  @ViewChild("container")
  container!: ElementRef;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    console.log("view init")
    if (this.element !== undefined) {
      this.container.nativeElement.appendChild(this.element);
    }
  }

  public addHtmlElement(element: HTMLElement) {
    this.element = element.cloneNode(true);
    console.log("add");
  }



}
