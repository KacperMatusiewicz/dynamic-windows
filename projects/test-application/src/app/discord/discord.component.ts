import {Component, OnInit} from '@angular/core';
import {DynamicWindow} from "dynamic-windows-core";

@Component({
  selector: 'app-discord',
  templateUrl: './discord.component.html',
  styleUrls: ['./discord.component.css']
})
export class DiscordComponent extends DynamicWindow implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
