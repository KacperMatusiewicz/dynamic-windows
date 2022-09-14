# Dynamic Windows
## About
## Getting started

### Install Dynamic Windows

Use the Angular CLI's installation schematic to set up your Dynamic Windows project
by running the following command:

```shell
$ ng add dynamic-windows-core
```
 or
```shell
$ npm install dynamic-windows-core
```

### Initiate a window service
There are two ways of defining a display, either using a directive or inside the component by calling `windowStore.setWindowContainerRef()`.

First you have to specify what dom element should act as a "**display**"

Using a directive, this method is less intrusive and much simpler:
```html
<!-- app.component.html -->
<div dw-display></div>
```

or if you want to do it by directly calling WindowStoreService:

```html
<!-- app.component.html -->
<div #vcr></div>
```

```ts
// app.component.ts
@Component(...)
export class AppComponent implements AfterViewInit {

    @ViewChild("vcr", {read: ViewContainerRef})
    vcr!: ViewContainerRef;

    constructor(private windowsStore: WindowStoreService<DynamicWindow>) {}

    ngAfterViewInit(): void {
        this.windowsStore.setWindowContainerRef(this.vcr);
    }
}
```

### Create a window
```html
<!-- window.component.html -->
<div dw-windowframe style="background-color: blueviolet; height: 100px; width: 100px;">
  This is a Window!
</div>
```

```ts
// window.component.ts

@Component(...)
export class WindowComponent extends DynamicWindow {

    constructor() {
        super();
    }
}
```

```ts
// app.component.ts
...

this.windowStore.createWindow(WindowComponent);

...
```

### Close a window
The simplest way to close a window is to call **closeWindow()** method 
which is defined in DynamicWindow class.
So for example we'll add a button calling this method.
```html
<!-- window.component.html -->
  <button (click)="this.closeWindow()">Close me!</button>

```

## Overriding default methods
It is possible to override the default behavior when closing a window. For example:

When you have a text editor with unsaved changes,
you probably should ask for a confirmation before closing and act accordingly.

To do that you'll need
to override "**resolveCloseWindowAction()**" method and add your logic there.

Generally the recommended way of closing a window
in an overridden method is to call `super.resolveCloseWindowAction();`.

The process of closing a window from inside the component is shown in the diagram below:

```mermaid

sequenceDiagram
    actor User
    participant WindowComponent
    participant WindowService
    User->>WindowComponent: closeWindow() please
    WindowComponent->>WindowService: closeWindow()
    WindowService->>WindowComponent: resolveCloseWindowAction()
    WindowComponent->>WindowService: terminate(windowId)
    
```

```ts
 override resolveCloseWindowAction() {
    if (window.confirm("Are u sure?")){
      super.resolveCloseWindowAction();
    }
  }
```

## Closing window from outside the component 

Note that closing a window from outside the component requires window id.
A way to get the window id is to save it while creating a component because
createWindow method returns `ComponentRef<any>`.
This is shown in the example below:

```ts
// app.component.ts
...

// You can access the created window from this variable.
const cRef: ComponentRef<any> = this.windowStore.createWindow(WindowComponent);
const windowId: number = cRef?.instance.id;

...
```
The process of closing a window from outside the component is shown in the diagram below:


```mermaid

sequenceDiagram
    actor User
    participant WindowService
    participant WindowComponent
    Note left of WindowService: window id is passed as argument
    User->>WindowService: closeWindow(windowId) please
    WindowService->>WindowComponent: resolveCloseWindowAction()
    WindowComponent->>WindowService: terminate(windowId)
    
```


## Configuration

## Create window from html content
```ts
...

    // Create HTML element/s:
    let e = document.createElement("ul");
    let e2 = document.createElement("li");
    e2.innerText ="element 1 ";
    let e3 = document.createElement("img");
    e3.src = "assets/img.png";
    e3.width = 100;
    e.appendChild(e2);
    e.appendChild(e3);

    // Create window from HTML element:
    this.windowsStore.createWindowFromHtmlElement(e);
...
```

Note, that you can create multiple windows from the same HTML element, 
because while creating a window, the HTML element is cloned into it. 
### Create custom wrapping window
In order to create a custom wrapping window, instead of extending DynamicWindow you extend `WrappingWindow` and override those methods:

Example of creating custom wrapping window:
```ts
@Component(...)
export class HtmlWrappingWindowComponent extends WrappingWindow {
    
  // implemented abstract members:
  
  // it's the method being invoke while creating a component via service 
  public addHtmlElement(element: HTMLElement) {
    this.element = element.cloneNode(true);
  }

  // this method makes sure sure that added HTML element will be appended
  // to the view as soon as the view initializes
  // (it's called in the ngAfterViewInit hook)
  appendChild(): void {
    if (this.element !== undefined) {
      this.container.nativeElement.appendChild(this.element);
    }
  }
}
```
`addHtmlElement()` is called when the element is created and this is where you should assign it to some field .

`appendChild()` is called when the window is ready to display it, it's here you want to add it to your window.
Trying to append the element in `addHtmlElement()` will probably result in failure so refrain from doing that.

## Window structure

### Component structure
To create a custom window you should extend `DynamicWindow` base class.
Then you can style your window in **.html** and **.css** files.

`DynamicWindow` class gives you access to WindowService instance, stores your window id, 
and provides basic functionality to manage your window from within the component.
```ts
@Component(...)
export class WindowComponent extends DynamicWindow {

  constructor() {
    super();
  }
}
```

### Template structure

Although `dw-windowframe` attribute is optional, if you'd like your window to be resizable,
draggable and focusable out of the box we encourage you to use this attribute: 

```html
<div dw-windowframe>
  ...
</div>
```
Attribute `dw-windowframe` contains other attributes with default settings:

#### `dw-windowframe` = `dw-resizable` + `dw-focusable` + `dw-draggable`

## Resizable window
By default, windows cannot be resized, to enable resizing add a `dw-resizable` attribute.

```html
<div dw-resizable>
  ...
</div>
```
This will add to your HTML element set of invisible html elements, which we'll call anchors:
# obrazek z anchorami

As you can see, there are eight of them, four edge anchors, and four corner anchors.

### Setting custom anchor size
If you want to customize the size of the resizing anchors, you can specify `anchor-size` property
by passing a number in px. (the default anchor size is 10px)

```html
<div dw-resizable anchor-size="50">
  ...
</div>
```

## Draggable window
To enable the window to be moved around, add a `dw-draggable` directive to it.

```html
<div dw-draggable>
  ...
</div>
```

### Defining custom draggable space
You can exclude certain parts of your window from being a draggable space, 
dw-draggable affects all child elements, 
but you can prevent them from becoming a hook for dragging using `dw-non-draggable-space` attribute,
for example you might want elements like `<textarea>` to respond to `mousedown` event in a canonical way.

Furthermore, you can set `recursive` value on a `dw-non-draggable-space` property to affect all child nodes.
```html
<div dw-draggable>
  ...
  <div dw-draggable-space>
    ...
    <textarea dw-non-draggable-space ></textarea>
    ...
    <div dw-non-draggable-space="recursive">
      <div></div> <-- This div will be also treated as non-draggable space.
    </div>
    ...
    <div dw-non-draggable-space >
      <div></div> <-- Note, that you can still drag the window
                      using this element as a hook.
    </div>
    ...
  </div>
  ...
</div>
```
In some cases you might want to set `dw-non-draggable-space` recursively on all child nodes of the specified element,
excluding the element itself, this can be achieved by setting `recursive-child` value on `dw-non-draggable-space`.
```html
...
<ul dw-non-draggable-space="recursive-child"> <-- This element still is draggable,
  <li class="first-button">                       but all child elements are NOT.
    <button>Hey!</button>
  </li>
  <li class="second-button">
    <button>Listen!</button>
  </li>
  <li class="more-buttons">
    <button>Button 1</button>
    <button>Button 2</button>
    <button>Button 3</button>
  </li>
</ul>
...
```

## Focusable window
The window defined as `dw-focusable` will be pulled above other windows when clicked.
This directive should be applied on the window frame:

```html
<div dw-focusable>
  ...
</div>
```
### Custom styling for a focused window
If you want your window to appear differently depending on whether it is focused,
you can use `.dw-focused` class in your CSS.

For example:
```css

.mybutton {
  background-color: white;
}

/* When the window is focused */
.dw-focused .mybutton {
  background-color: red;
}

```


## Saving windows state to local storage
