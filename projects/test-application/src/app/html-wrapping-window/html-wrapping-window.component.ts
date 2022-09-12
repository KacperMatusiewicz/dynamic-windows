import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WrappingWindow} from "../../../../dynamic-windows-core/src/lib/wrapping-window";

@Component({
  selector: 'app-html-wrapping-window',
  templateUrl: './html-wrapping-window.component.html',
  styleUrls: ['./html-wrapping-window.component.css']
})
export class HtmlWrappingWindowComponent extends WrappingWindow implements OnInit, AfterViewInit {

  element: Node | undefined;

  @ViewChild("container")
  container!: ElementRef;

  constructor() {
    super();
  }

  ngOnInit(): void {
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
