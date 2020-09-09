import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appThemeToggle]'
})
export class ThemeToggleDirective implements OnChanges{

  @Input() toggle: string;


  styleElement: HTMLStyleElement = document.createElement('style');

  attributeName = 'theme-dir';

  constructor(private el: ElementRef) {
    const nativeEl: HTMLElement = this.el.nativeElement;
    nativeEl.setAttribute(this.attributeName, '');
    nativeEl.appendChild(this.styleElement);
  }

  ngOnChanges(): void {
    this.removeToggle();
  }

  private removeToggle(): void {
    this.styleElement.innerText = `
      [${this.attributeName}] .mat-slide-toggle-bar {
       display: ${this.toggle};
      }
    `;
  }
}
