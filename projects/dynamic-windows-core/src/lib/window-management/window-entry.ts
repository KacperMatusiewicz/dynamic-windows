import {ComponentRef, ElementRef} from "@angular/core";

export class WindowEntry {
  public component: ComponentRef<any>
  private minimized: boolean = false


  constructor(componentRef: ComponentRef<any>) {
    this.component = componentRef;
  }

  public setPosition(x: number, y: number){

  }

  public setSize(x: number, y: number){

  }

  public getId(): number{
    return this.component.instance.id
  }

  public hasId(id: number): boolean {
    if (this.getId() === id)
      return true

    return false
  }

  public isMinimized(): boolean{
    return this.minimized
  }

  public minimize(){
    this.minimized = true
    let element = this.getWindow()
    element.style.display = 'none'
  }

  public restore(){
    this.minimized = false
    let element = this.getWindow()
    element.style.display = ''
  }

  public getWindow(): HTMLElement {
    if (this.component.location.nativeElement.children.length > 1)
      console.error("There can be only one root element in window declaration.")
    return this.component.location.nativeElement.firstChild
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
    this.restore()
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
    let element = this.getWindow()
    if (this.isFocusable(element))
      return true

    return false
  }

  public addFocusedClass(){
    let element = this.getWindow()
    if (this.isFocusable(element))
      element.classList.add('dw-focused')
  }

  public addNotFocusedClass() {
    let element = this.getWindow()
    if (this.isFocusable(element))
      element.classList.add('dw-not-focused')
  }

  public removeFocusedClass(){
    let element = this.getWindow()
    if (this.isFocusable(element))
      if (element.classList.contains('dw-focused'))
        element.classList.remove('dw-focused')
  }

  public removeNotFocusedClass() {
    let element = this.getWindow()
    if (this.isFocusable(element))
      if (element.classList.contains('dw-not-focused'))
        element.classList.remove('dw-not-focused')
  }

  public getInstance(){
    return this.component.instance
  }

  public setZIndex(index: number){
    let element = this.getWindow()
    element.style.zIndex = `${index}`
  }
}
