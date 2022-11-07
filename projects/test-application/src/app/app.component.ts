import {AfterViewInit, ChangeDetectorRef, Component, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';
import {ExampleComponent} from "./example/example.component";
import {FancyMusicPlayerComponent} from "./fancy-music-player/fancy-music-player.component";
import {WindowStoreService} from "dynamic-windows-core";
import {ExampleHtmlWrappingComponent} from "./example-html-wrapping/example-html-wrapping.component";
import {Win2kWindowComponent} from "./win2k-window/win2k-window.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'test-application';

  @ViewChild("vcr", {read: ViewContainerRef})
  vcr!: ViewContainerRef;
  componentRef!: ComponentRef<any>;
  constructor(private windowsStore: WindowStoreService, private change: ChangeDetectorRef) {

  }

  ngAfterViewInit(): void {
    // this.windowsStore.setWindowContainerRef(this.vcr);
    //this.componentRef = this.windowsStore.createWindow(Win2kWindowComponent);
    // this.change.detectChanges();
  }

  create() {
    this.componentRef = this.windowsStore.createWindow(ExampleComponent);
  }

  createFancy() {
    this.componentRef = this.windowsStore.createWindow(FancyMusicPlayerComponent);
  }

  close() {

    this.windowsStore.closeWindow(this.componentRef.instance.id);
  }

  createMultipleWindowsFromHTMLElement() {
    let e = document.createElement("ul");
    let e2 = document.createElement("li");
    e2.innerText ="element 1 ";
    let e3 = document.createElement("img");
    e3.src = "assets/img.png";
    e3.width = 100;
    e.appendChild(e2);
    e.appendChild(e3);
    this.windowsStore.createWindowFromHtmlElement(e, ExampleHtmlWrappingComponent);
    this.windowsStore.createWindowFromHtmlElement(e, ExampleHtmlWrappingComponent);
  }

  createOldLookingWindow() {
    this.componentRef = this.windowsStore.createWindow(Win2kWindowComponent);
  }
}
