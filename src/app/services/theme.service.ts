import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {OverlayContainer} from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public theme$ = new BehaviorSubject(false); // false light, true dark
  constructor( private overlay: OverlayContainer) { }


  public lightMode(): void {
    document.body.classList.remove('dark-theme-color');
    document.body.classList.remove('dark-theme');
    this.overlay.getContainerElement().classList.remove('dark-theme');

    document.body.classList.add('light-theme-color');
    document.body.classList.add('light-theme');
    this.overlay.getContainerElement().classList.add('light-theme');
  }

  public darkMode(): void {
    document.body.classList.remove('light-theme-color');
    document.body.classList.remove('light-theme');
    this.overlay.getContainerElement().classList.remove('light-theme');

    document.body.classList.add('dark-theme-color');
    document.body.classList.add('dark-theme');
    this.overlay.getContainerElement().classList.add('dark-theme');
  }
}
