import {ComponentRef} from "@angular/core";

export class WindowEntry {
  public componentRef: ComponentRef<any>


  constructor(componentRef: ComponentRef<any>) {
    this.componentRef = componentRef;
  }

  public delete(){
    this.componentRef.location.nativeElement.remove()
  }

  public unfocus(){
    this.removeFocusedClass()
    this.addNotFocusedClass()
  }

  public focus(){
    this.removeNotFocusedClass()
    this.addFocusedClass()
  }

  public addFocusedClass(){
    let elements = this.getDirectChildren()
    for(let i=0; i<elements.length; i++){
      elements[i].classList.add('dw-focused')
    }
  }

  public addNotFocusedClass() {
    let elements = this.getDirectChildren()
    for(let i=0; i<elements.length; i++){
      elements[i].classList.add('dw-not-focused')
    }
  }

  public removeFocusedClass(){
    let elements = this.getDirectChildren()
    for(let i=0; i<elements.length; i++){
      if (elements[i].classList.contains('dw-focused'))
        elements[i].classList.remove('dw-focused')
    }
  }

  public removeNotFocusedClass() {
    let elements = this.getDirectChildren()
    for(let i=0; i<elements.length; i++){
      if (elements[i].classList.contains('dw-not-focused'))
        elements[i].classList.remove('dw-not-focused')
    }
  }

  public getDirectChildren(): HTMLCollection {
    // return this.componentRef.location.nativeElement.querySelectorAll(':scope > *')
    return this.componentRef.location.nativeElement.children
  }

  public setZIndex(index: number){
    let elements = this.getDirectChildren()
    for(let i=0; i<elements.length; i++){
      (elements[i] as HTMLElement).style.zIndex = `${index}`
    }
  }
}
