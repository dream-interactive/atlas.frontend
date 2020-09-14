import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ThemeStorageService} from '../../../services/theme-storage.service';
import {StyleService} from '../../../services/style.service';
import {SiteTheme, ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemePickerComponent {

  currentTheme: SiteTheme;
  checked: boolean;

  constructor(
    public styleService: StyleService,
    private themeService: ThemeService,
    private themeStorage: ThemeStorageService) {

    const themeName = this.themeStorage.getStoredThemeName();

    if (themeName) {
      setTimeout(() => {
        this.selectTheme(themeName);
      }, 100);
      this.checked = themeName === 'dark-theme';
    }
  }


  selectTheme(themeName: string): void {

    const theme = this.themeService.findTheme(themeName);

    if (!theme) {
      return;
    }
    this.themeService.updateTheme(theme);
    this.currentTheme = theme;

    if (theme.isDefault) {
      this.styleService.removeStyle('theme');
    } else {
      this.styleService.setStyle('theme', `assets/${theme.name}.css`);
    }

    if (this.currentTheme) {
      this.themeStorage.storeTheme(this.currentTheme);
    }
  }
}
