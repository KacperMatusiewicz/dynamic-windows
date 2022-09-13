import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[dw-non-draggable-space]'
})
export class NonDraggableSpaceDirective implements AfterViewInit{

  @Input('dw-non-draggable-space')
  propagationStrategy: string = "";

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.setDefaultPropagationStrategyValue();

    switch (this.propagationStrategy){
      case "recursive": {
        this.setNonDraggableRecursive(this.elementRef.nativeElement);
        break;
      }
      case "recursive-child": {
        this.setNonDraggableRecursiveChild(this.elementRef.nativeElement);
        break;
      }
      default: {
        this.elementRef.nativeElement.classList.add("dw-non-draggable-space");
      }
    }
  }

  private setNonDraggableRecursiveChild(el: HTMLElement){
    for (let i=0; i<el.children.length; i++){
      let child = el.children.item(i) as HTMLElement;
      if(child !== null)
        this.setNonDraggableRecursive(child);
    }
  }

  private setNonDraggableRecursive(el: HTMLElement){
    el.classList.add('dw-non-draggable-space');
    for (let i=0; i<el.children.length; i++){
      let child = el.children.item(i) as HTMLElement;
      if(child !== null)
        this.setNonDraggableRecursive(child);
    }
  }

  private setDefaultPropagationStrategyValue() {
    if (this.propagationStrategy.length === 0) {
      this.propagationStrategy = "non-recursive";
    }
  }
}
