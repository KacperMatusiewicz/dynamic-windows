import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DynamicWindow} from "../../../../dynamic-windows-core/src/lib/dynamic-window";

@Component({
  selector: 'app-fancy-window',
  templateUrl: './fancy-window.component.html',
  styleUrls: ['./fancy-window.component.css']
})
export class FancyWindowComponent extends DynamicWindow implements OnInit, AfterViewInit {

  @ViewChild("audioSpectrum")
  canvas!: ElementRef<any>;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.drawSpectrum();
  }

  doStuff(){
    console.log("Press")
  }

  private drawSpectrum() {
    if (this.canvas){
      let c: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
      let mm = Math.random() * 256;
      for (let i = 0; i < 256; i+=4){
        c.beginPath()

        if (i < mm)
          c.fillStyle = "#272528"
        else
          c.fillStyle = "#a39e91"

        let height = Math.random()*16+32;
        if (i == 0){
          height /= 2;
        }
        c.fillRect(i,48/2-height/2, 2, height);
        c.closePath()
      }

    }
  }
}
