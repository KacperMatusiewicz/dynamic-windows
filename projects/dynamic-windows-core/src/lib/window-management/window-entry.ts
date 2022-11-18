import {ComponentRef} from "@angular/core";
import {WindowState} from "./window-state";

export class WindowEntry {
  private floatingState: WindowState
  public component: ComponentRef<any>
  private minimized: boolean = false
  private maximized: boolean = false


  constructor(componentRef: ComponentRef<any>) {
    this.component = componentRef;
    this.getWindow().setAttribute("dw-windowid", this.getId().toString())
    this.floatingState = this.getCurrentState()
  }

  public getCurrentState(): WindowState{
    let window = this.getWindow()
    let x = Number.parseInt(getComputedStyle(window).left)
    let y = Number.parseInt(getComputedStyle(window).top)
    let w = Number.parseInt(getComputedStyle(window).width)
    let h = Number.parseInt(getComputedStyle(window).height)
    return new WindowState(x,y,w,h)
  }

  public saveCurrentFloatingState(){
    this.floatingState = this.getCurrentState()
  }

  public restoreSizeFromState(state: WindowState){
    this.setPosition(state.getX(), state.getY())
    this.setSize(state.getW(), state.getH())
  }

  public setPosition(x: number, y: number){
    let element = this.getWindow()
    element.style.left = `${x}px`
    element.style.top  = `${y}px`
  }

  public setSize(x: number, y: number){
    let element = this.getWindow()
    element.style.width  = `${x}px`
    element.style.height = `${y}px`
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

  public isMaximized(): boolean{
    return this.maximized
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

  public maximize(){
    this.maximized = true
    this.saveCurrentFloatingState()
    this.addMaximizedClass()
  }

  public unMaximize(){
    this.maximized = false
    this.restoreSizeFromState(this.floatingState)
    this.removeMaximizedClass()
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

  public addMaximizedClass(){
    let element = this.getWindow()
    element.classList.add('dw-maximized')
  }

  public removeMaximizedClass() {
    let element = this.getWindow()
    element.classList.remove('dw-maximized')
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
