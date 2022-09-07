import {AfterViewInit, Component, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';
import {WindowStoreService} from "../../../dynamic-windows-core/src/lib/window-store.service";
import {ExampleComponent} from "./example/example.component";
import {DynamicWindow} from "../../../dynamic-windows-core/src/lib/dynamic-window";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'test-application';

  @ViewChild("vcr", {read: ViewContainerRef})
  vcr!: ViewContainerRef;
  componentRef: ComponentRef<any> | undefined | null;
  constructor(private windowsStore: WindowStoreService<DynamicWindow>) {

  }

  ngAfterViewInit(): void {
    this.windowsStore.setWindowContainerRef(this.vcr);
   // this.vcr.element.nativeElement.style = "position: relative;"
  }

  create() {
     this.componentRef = this.windowsStore.createWindow(ExampleComponent);
  }

  close() {
    this.windowsStore.closeWindow(this.componentRef?.instance.id);
  }
  logViewChild(){
    this.componentRef?.instance.logViewChild();
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
    this.windowsStore.createWindowFromHtmlElement(e);
    this.windowsStore.createWindowFromHtmlElement(e);
  }
}
