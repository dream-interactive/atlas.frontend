import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appDark]'
})
export class DarkDirective implements OnChanges{

  @Input() toggle: string;
  styleElement: HTMLStyleElement = document.createElement('style');

  attributeName = 'theme-toggle';

  constructor(private el: ElementRef) {
    const nativeEl: HTMLElement = this.el.nativeElement;
    nativeEl.setAttribute(this.attributeName, '');
    nativeEl.appendChild(this.styleElement);
  }

  ngOnChanges(): void {
    this.setColors();
  }

  setColors(): void {
    this.styleElement.innerText = `
      [${this.attributeName}] .mat-slide-toggle-bar {
       display: ${this.toggle};
      }
    `;
  }

}
