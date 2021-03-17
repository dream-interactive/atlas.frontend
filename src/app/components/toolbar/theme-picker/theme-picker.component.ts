import {ChangeDetectionStrategy, Component} from '@angular/core';
import {StyleService} from '../../../shared/style.service';
import {SiteTheme, ThemeService} from '../../../shared/theme.service';
import {LocalStorageService} from '../../../shared/local-storage.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemePickerComponent {

  currentTheme: SiteTheme = ThemeService.defaultTheme;
  checked = false;

  constructor(
    public styleService: StyleService,
    private themeService: ThemeService,
    private localStorage: LocalStorageService) {

    const themeName = this.localStorage.getValue(LocalStorageService.themeKey);

    if (themeName) {
      this.selectTheme(themeName);
      this.checked = themeName === 'dark-theme';
    }
    else { // if the localstorage is empty  set the default light theme
      this.selectTheme(ThemeService.defaultTheme.name);
      this.checked = false;
    }
  }


  selectTheme(themeName: string): void {

    const theme = this.themeService.findTheme(themeName);

    if (!theme) { // if theme doesn't exist in theme array
      return;
    }
    this.themeService.updateTheme(theme);
    this.currentTheme = theme;


    this.styleService.removeStyle('theme');
    this.styleService.setStyle('theme', `themes/${theme.name}.css`);

    if (this.currentTheme) {
      this.localStorage.store(LocalStorageService.themeKey, this.currentTheme.name);
    }
  }
}
