import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {DynamicWindowsCoreModule} from "../../../dynamic-windows-core/src/lib/dynamic-windows-core.module";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ExampleComponent} from './example/example.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DynamicWindowsCoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
