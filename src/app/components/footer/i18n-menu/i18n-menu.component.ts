import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-i18n-menu',
  templateUrl: './i18n-menu.component.html',
  styleUrls: ['./i18n-menu.component.scss']
})
export class I18nMenuComponent{

  public language = 'ua';

  constructor(private translate: TranslateService) {
  }

  changeLanguage(event: EventListener): void {
    // @ts-ignore
    this.translate.use(event.source.value);
  }
}
