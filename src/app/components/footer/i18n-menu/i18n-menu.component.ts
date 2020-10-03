import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from '../../../services/local-storage.service';

@Component({
  selector: 'app-i18n-menu',
  templateUrl: './i18n-menu.component.html',
  styleUrls: ['./i18n-menu.component.scss']
})
export class I18nMenuComponent{

  public language: string;

  constructor(private translate: TranslateService,
              private local: LocalStorageService) {

    const langFromLocal = local.getValue(LocalStorageService.langKey);
    if (langFromLocal){
      this.language = langFromLocal;
    } else {
      this.language = 'en';
    }
  }

  changeLanguage(event: EventListener): void {
    // @ts-ignore
    const value = event.source.value;

    this.translate.use(value);
    this.local.store(LocalStorageService.langKey, value);
  }
}
