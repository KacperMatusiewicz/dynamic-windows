import {Observable} from "rxjs";

export interface TaskbarItem {
  setIcon(icon: string | null): void;
  unMinimize(): void;
  minimize(): void;
  focus(): void;
  setTitle(title: string | Observable<string>): void;
}
