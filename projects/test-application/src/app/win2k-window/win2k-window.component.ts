import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DynamicWindow} from "dynamic-windows-core";

@Component({
  selector: 'app-win2k-window',
  templateUrl: './win2k-window.component.html',
  styleUrls: ['./win2k-window.component.css']
})
export class Win2kWindowComponent extends DynamicWindow implements OnInit {

  @ViewChild("box")
  box!: ElementRef<HTMLElement>

  text: string = "No hejka co tam się z toba dzieje, skąd to zwątpienie, dlaczego teraz chcesz się poddać skoro raz drugi ci nie wyszło, to nie jest żaden powód, musisz iść do przodu, osiągniesz cel, prędzej czy później go osiagniesz, ale musisz isć do przodu przeć walczyć o swoje, nie ważne że wszystko dookoła jest przeciwko tobie, najważniejsze jest to że masz tutaj wole zwycięstwa, każdy może osiągnąć cel, nie ważne czy taki czy taki, ale trzeba isć i walczyć, to teraz masz 3 sekundy żeby się otrząsnąć, powiedzieć sobie dobra basta, pięścią w stół, ide do przodu i osiągam swój cel, POZDRO";

  constructor() {
    super();
    this.windowIconPath = "assets/notepad.png"
    this.windowName = "Untitled - Notepad"
  }

  public override minimize(){
    setTimeout(()=> super.minimize(), 200)
    this.box.nativeElement.style.transition = 'transform 0.2s ease-in 0s'
    this.box.nativeElement.style.transform  = 'translateY(90vh) scale(0.01)'
  }

  public override restore(){
    setTimeout(()=> {
      super.restore()
      this.box.nativeElement.style.transition = ''
      this.box.nativeElement.style.transform  = ''
    }, 200)
    this.box.nativeElement.style.transform  = 'translateY(0) scale(1)'
  }

  ngOnInit(): void {
  }

}
