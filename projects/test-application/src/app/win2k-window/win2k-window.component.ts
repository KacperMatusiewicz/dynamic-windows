import {Component, OnInit} from '@angular/core';
import {DynamicWindow} from "dynamic-windows-core";

@Component({
  selector: 'app-win2k-window',
  templateUrl: './win2k-window.component.html',
  styleUrls: ['./win2k-window.component.css']
})
export class Win2kWindowComponent extends DynamicWindow implements OnInit {

  text: string = "No hejka co tam się z toba dzieje, skąd to zwątpienie, dlaczego teraz chcesz się poddać skoro raz drugi ci nie wyszło, to nie jest żaden powód, musisz iść do przodu, osiągniesz cel, prędzej czy później go osiagniesz, ale musisz isć do przodu przeć walczyć o swoje, nie ważne że wszystko dookoła jest przeciwko tobie, najważniejsze jest to że masz tutaj wole zwycięstwa, każdy może osiągnąć cel, nie ważne czy taki czy taki, ale trzeba isć i walczyć, to teraz masz 3 sekundy żeby się otrząsnąć, powiedzieć sobie dobra basta, pięścią w stół, ide do przodu i osiągam swój cel, POZDRO";

  constructor() {
    super();
    this.windowIconPath = "assets/notepad.png"
    this.windowName = "Untitled - Notepad"
  }

  ngOnInit(): void {
  }

}
