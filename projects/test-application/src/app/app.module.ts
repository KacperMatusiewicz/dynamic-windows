import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ExampleComponent} from './example/example.component';
import {FancyWindowComponent} from './fancy-window/fancy-window.component';
import {FancyMusicPlayerComponent} from './fancy-music-player/fancy-music-player.component';
import {ExampleHtmlWrappingComponent} from './example-html-wrapping/example-html-wrapping.component';
import {DynamicWindowsCoreModule} from "dynamic-windows-core";
import {DiscordComponent} from './discord/discord.component';
import {TaskbarComponent} from './taskbar/taskbar.component';
import {Win2kWindowComponent} from './win2k-window/win2k-window.component';


@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    FancyWindowComponent,
    FancyMusicPlayerComponent,
    ExampleHtmlWrappingComponent,
    DiscordComponent,
    TaskbarComponent,
    Win2kWindowComponent,
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
