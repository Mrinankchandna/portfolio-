import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HoverEffectService {
  private hoveredSubject = new BehaviorSubject<boolean>(false);
  hovered$ = this.hoveredSubject.asObservable();

  constructor() {}

  setHoveredState(state: boolean): void {
    this.hoveredSubject.next(state);
  }

  getHoveredState(): boolean {
    return this.hoveredSubject.getValue();
  }
}
