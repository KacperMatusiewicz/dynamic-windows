import {AfterViewInit, Component, ViewChild, ViewContainerRef} from '@angular/core';
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

  constructor(private windowsStore: WindowStoreService<DynamicWindow>) {

  }

  ngAfterViewInit(): void {
    this.windowsStore.setWindowContainerRef(this.vcr);
    this.windowsStore.createWindow(ExampleComponent);
  }
}
