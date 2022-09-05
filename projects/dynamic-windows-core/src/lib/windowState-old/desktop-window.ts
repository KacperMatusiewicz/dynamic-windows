import {Observable} from "rxjs";

export interface DesktopWindow {
  getIcon() : string | null;
  getTitle(): string | Observable<string>;
  close(): void;
  focus(): void;
  maximize(): void;
  minimize(): void;
  setId(windowId: number): void;
}


