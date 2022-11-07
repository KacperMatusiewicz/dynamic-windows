import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DynamicWindow} from "dynamic-windows-core";


@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent extends DynamicWindow implements OnInit {

  @ViewChild("inputField")
  inputField!: ElementRef<HTMLTextAreaElement>

  constructor() {
    super();
    this.windowName = "Text Editor"
  }

  ngOnInit(): void {
  }

  override resolveCloseWindowAction() {
    if (window.confirm("Are you sure?")){

      if (this.id != null) {
        this.w.terminate(this.id)
      }

    }
  }

  public updateTitle($event: KeyboardEvent){
    console.log($event)
    this.windowName = this.inputField.nativeElement.value
  }

}
