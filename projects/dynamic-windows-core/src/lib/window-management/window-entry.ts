import {ComponentRef} from "@angular/core";

export class WindowEntry {
  public component: ComponentRef<any>


  constructor(componentRef: ComponentRef<any>) {
    this.component = componentRef;
  }

  public getId(): number{
    return this.component.instance.id
  }

  public hasId(id: number): boolean {
    if (this.getId() === id)
      return true

    return false
  }

  public delete(){
    this.component.location.nativeElement.remove()
  }

  public getWindowName(): string {
    return this.component.instance.windowName
  }

  public getWindowIconPath(): string {
    return this.component.instance.windowIconPath
  }

  public setWindowName(name: string) {
    this.component.instance.windowName = name
  }

  public setWindowIconPath(path: string) {
    this.component.instance.windowIconPath = path
  }

  public unfocus(){
    this.removeFocusedClass()
    this.addNotFocusedClass()
  }

  public focus(){
    this.removeNotFocusedClass()
    this.addFocusedClass()
  }

  private isFocusable(element: Node): boolean {
    let el = element as HTMLElement
    if (el.classList.contains('dw-focusable'))
      return true

    return false
  }

  public isEntryFocusable(): boolean {
    let elements = this.getDirectChildren()
    for(let i=0; i<elements.length; i++)
      if (this.isFocusable(elements[i]))
        return true

    return false
  }

  public addFocusedClass(){
    let elements = this.getDirectChildren()
    for(let i=0; i<elements.length; i++){
      if (this.isFocusable(elements[i]))
        elements[i].classList.add('dw-focused')
    }
  }

  public addNotFocusedClass() {
    let elements = this.getDirectChildren()
    for(let i=0; i<elements.length; i++){
      if (this.isFocusable(elements[i]))
        elements[i].classList.add('dw-not-focused')
    }
  }

  public removeFocusedClass(){
    let elements = this.getDirectChildren()
    for(let i=0; i<elements.length; i++){
      if (this.isFocusable(elements[i]))
        if (elements[i].classList.contains('dw-focused'))
          elements[i].classList.remove('dw-focused')
    }
  }

  public removeNotFocusedClass() {
    let elements = this.getDirectChildren()
    for(let i=0; i<elements.length; i++){
      if (this.isFocusable(elements[i]))
        if (elements[i].classList.contains('dw-not-focused'))
          elements[i].classList.remove('dw-not-focused')
    }
  }

  public getDirectChildren(): HTMLCollection {
    // return this.componentRef.location.nativeElement.querySelectorAll(':scope > *')
    return this.component.location.nativeElement.children
  }

  public setZIndex(index: number){
    let elements = this.getDirectChildren()
    for(let i=0; i<elements.length; i++){
      (elements[i] as HTMLElement).style.zIndex = `${index}`
    }
  }
}
