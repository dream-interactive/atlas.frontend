import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';


export interface SiteTheme {
  name: string;
  displayName?: string;
  accent?: string;
  primary?: string;
  isDark?: boolean;
  isDefault?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  static defaultTheme: SiteTheme =   {
    primary: '#eceff1',
    accent: '#26a69a',
    displayName: 'Light theme',
    name: 'light-theme',
    isDark: false,
    isDefault: true,
  };

  themes: SiteTheme[] = [
    {
      primary: '#263238',
      accent: '#26a69a',
      displayName: 'Dark theme',
      name: 'dark-theme',
      isDark: true,
    },
    ThemeService.defaultTheme
  ];

  private themeSubject$ = new BehaviorSubject(ThemeService.defaultTheme);
  theme$ = this.themeSubject$.asObservable();

  constructor() {
  }

  updateTheme(theme: SiteTheme): void {
    this.themeSubject$.next(theme);
  }

  findTheme(themeName: string): SiteTheme | undefined {
    return this.themes.find(currentTheme => currentTheme.name === themeName);
  }
}
