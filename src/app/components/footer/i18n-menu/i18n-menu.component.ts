import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from '../../../shared/local-storage.service';
import {ProfileService} from '../../../services/profile.service';
import {AtlasUser} from '../../../shared/atlas/entity.service';

@Component({
  selector: 'app-i18n-menu',
  templateUrl: './i18n-menu.component.html',
  styleUrls: ['./i18n-menu.component.scss']
})
export class I18nMenuComponent implements OnInit{

  public language: string;
  private profile: AtlasUser;

  constructor(private translate: TranslateService,
              private local: LocalStorageService,
              private profileService: ProfileService) {
  }

  // tslint:disable-next-line:typedef
  async ngOnInit() {

    const langFromLocal = this.local.getValue(LocalStorageService.langKey);

    if (langFromLocal){ // if local present in localstorage
      this.language = langFromLocal;
    } else {
      this.profile = await this.profileService.profile$.toPromise(); // get profile
      if (this.profile) {
        this.language = this.profile.local; // set local from profile
      } else {
        this.language = navigator.languages !== undefined ? navigator.languages[0] : 'en'; // else set from browser
      }
      this.local.store(LocalStorageService.langKey, this.language);
    }
  }

  changeLanguage(event: EventListener): void {
    // @ts-ignore
    const value = event.source.value;

    this.translate.use(value);
    this.local.store(LocalStorageService.langKey, value);
    if (this.profile && this.profile.sub) {
      this.profile.local = value;
      this.profileService.update(this.profile);
    }
  }
}
