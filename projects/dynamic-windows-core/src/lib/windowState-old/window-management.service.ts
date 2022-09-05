import {ComponentRef, Injectable, Type, ViewContainerRef} from '@angular/core';
import {WindowDto} from "./window-dto";
import {WindowType} from "./window-type";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WindowManagementService {

  currentZIndex: number;
  windowList:  Map<Number, HTMLElement>;
  taskBarList: Map<Number, HTMLElement>;
  idCounter: number;
  currentFocusedTaskbarElement: HTMLElement | undefined;
  currentFocusedWindowElement: HTMLElement | undefined;
  windowContainerRef : ViewContainerRef | undefined;
  taskbarContainerRef : ViewContainerRef | undefined;
  private lockedFocus: boolean;

  constructor() {
    this.currentZIndex = 10;
    this.idCounter = 0;
    this.windowList = new Map<Number, HTMLElement>();
    this.taskBarList= new Map<Number, HTMLElement>();
    this.currentFocusedTaskbarElement = undefined;
    this.currentFocusedWindowElement = undefined;
    this.lockedFocus = false;
  }

  setWindowContainerRef(windowContainerRef: ViewContainerRef) {
    this.windowContainerRef = windowContainerRef;
  }

  setTaskbarContainerRef(taskbarContainerRef: ViewContainerRef){
    this.taskbarContainerRef = taskbarContainerRef;
  }

  openWindow(window: WindowDto, cls: Type<any>) {
    let newDesktopPage! : ComponentRef<any>;
    switch (window.windowType) {
      case WindowType.SelftProfilePage:{
        if(this.windowContainerRef != undefined){
          newDesktopPage = this.windowContainerRef.createComponent(cls);
          this.windowList.set(this.idCounter, newDesktopPage.location.nativeElement);
        }
        break;
      }

      case WindowType.ManageFriendsPage:{
        if(this.windowContainerRef != undefined){
          newDesktopPage = this.windowContainerRef.createComponent(cls);
          this.windowList.set(this.idCounter, newDesktopPage.location.nativeElement);
        }
        break;
      }

      case WindowType.UserSearchPage:{
        if(this.windowContainerRef != undefined){
          newDesktopPage = this.windowContainerRef.createComponent(cls);
          this.windowList.set(this.idCounter, newDesktopPage.location.nativeElement);
        }
        break;
      }

      case WindowType.FeedPage:{
        if(this.windowContainerRef != undefined){
          newDesktopPage = this.windowContainerRef.createComponent(cls);
          this.windowList.set(this.idCounter, newDesktopPage.location.nativeElement);
        }
        break;
      }

      case WindowType.UserProfilePage:{
        if(this.windowContainerRef != undefined){
          newDesktopPage = this.windowContainerRef.createComponent(cls);
          newDesktopPage.instance.loadUserDetails(window.content?.userId);
          newDesktopPage.instance.setPosts(window.content?.userId);
          this.windowList.set(this.idCounter, newDesktopPage.location.nativeElement);
        }
        break;
      }

      case WindowType.MessageBox:
        break;

      case WindowType.ChangePasswordPage:{
        if(this.windowContainerRef != undefined){
          newDesktopPage = this.windowContainerRef.createComponent(cls);
          this.windowList.set(this.idCounter, newDesktopPage.location.nativeElement);
        }
        break;
      }

      case WindowType.NotificationPage:{
        if(this.windowContainerRef != undefined){
          newDesktopPage = this.windowContainerRef.createComponent(cls);
          this.windowList.set(this.idCounter, newDesktopPage.location.nativeElement);
        }
        break;
      }

      case WindowType.DeleteAccountPage:{
        if(this.windowContainerRef != undefined){
          newDesktopPage = this.windowContainerRef.createComponent(cls);
          this.windowList.set(this.idCounter, newDesktopPage.location.nativeElement);
        }
        break;
      }

      case WindowType.CreatePostPage:{
        if(this.windowContainerRef != undefined){
          newDesktopPage = this.windowContainerRef.createComponent(cls);
          this.windowList.set(this.idCounter, newDesktopPage.location.nativeElement);
        }
        break;
      }

      case WindowType.EditPostPage:{
        if(this.windowContainerRef != undefined){
          newDesktopPage = this.windowContainerRef.createComponent(cls);
          console.log("tutu")
          console.log(window.content?.postId);
          newDesktopPage.instance.setPostContent(window.content?.postId)
          this.windowList.set(this.idCounter, newDesktopPage.location.nativeElement);
        }
        break;
      }

      case WindowType.ChangePersonalInfoPage:{
        if(this.windowContainerRef != undefined){
          newDesktopPage = this.windowContainerRef.createComponent(cls);
          this.windowList.set(this.idCounter, newDesktopPage.location.nativeElement);
        }
        break;
      }

      case WindowType.ChangeContactInfoPage:{
        if(this.windowContainerRef != undefined){
          newDesktopPage = this.windowContainerRef.createComponent(cls);
          this.windowList.set(this.idCounter, newDesktopPage.location.nativeElement);
        }
        break;
      }
    }
    if (this.taskbarContainerRef){
      let newTaskBarItem = this.taskbarContainerRef.createComponent(cls);
      newTaskBarItem.instance.setIcon(newDesktopPage.instance.getIcon());
      newTaskBarItem.instance.setTitle(newDesktopPage.instance.getTitle());
      this.taskBarList.set(this.idCounter, newTaskBarItem.location.nativeElement);
      this.focusWindow(this.idCounter);
      this.lockedFocus = true;
      new Observable(
        (subscriber) => {
          setTimeout(
            () => {
              subscriber.next();
              subscriber.complete();
            }, 5
          )
        }
      ).subscribe(
        (next) => {
          this.lockedFocus = false;
        }
      );
    }
    this.idCounter++;
  }

  closeWindow(windowId: number) {
    this.windowList.get(windowId)?.remove();
    this.taskBarList.get(windowId)?.remove();
    this.windowList.delete(windowId);
    this.taskBarList.delete(windowId);
  }

  minimizeWindow(windowId: number) {
    this.windowList.get(windowId)?.setAttribute("hidden", "");
    this.taskBarList.get(windowId)?.setAttribute("hiddenState", "true");
    this.currentFocusedTaskbarElement?.setAttribute("focused","false");
  }

  unminimizeWindow(windowId: number) {
    this.windowList.get(windowId)?.removeAttribute("hidden");
    this.taskBarList.get(windowId)?.setAttribute("hiddenState", "false");
    this.currentFocusedTaskbarElement = this.taskBarList.get(windowId);
    this.currentFocusedTaskbarElement?.setAttribute("focused","true");
  }

  maximizeWindow(windowId: number) {
  }

  focusWindow(windowId: number) {
    if(!this.lockedFocus) {
      this.currentFocusedTaskbarElement?.setAttribute("focused", "false");
      this.currentFocusedTaskbarElement = this.taskBarList.get(windowId);
      this.currentFocusedWindowElement = this.windowList.get(windowId);
      this.currentFocusedTaskbarElement?.setAttribute("focused","true");
      if(this.currentFocusedWindowElement != undefined){
        this.currentFocusedWindowElement.style.zIndex = `${this.currentZIndex++}`;
      }
    }
  }
  unfocusWindow(windowId: number) {
    this.currentFocusedTaskbarElement?.setAttribute("focused","false");

  }

  getId() {
    return this.idCounter;
  }
}
