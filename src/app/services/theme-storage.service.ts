import {EventEmitter, Injectable} from '@angular/core';
import {SiteTheme} from './theme.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeStorageService {

  static storageKey = 'theme-current-name';

  onThemeUpdate: EventEmitter<SiteTheme> = new EventEmitter<SiteTheme>();

  storeTheme(theme: SiteTheme): void {
    try {
      window.localStorage[ThemeStorageService.storageKey] = theme.name;
    } catch { }

    this.onThemeUpdate.emit(theme);
  }

  getStoredThemeName(): string | null {
    try {
      return window.localStorage[ThemeStorageService.storageKey] || null;
    } catch {
      return null;
    }
  }

  clearStorage(): void {
    try {
      window.localStorage.removeItem(ThemeStorageService.storageKey);
    } catch { }
  }
}
