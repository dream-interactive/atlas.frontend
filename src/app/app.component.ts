import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService,
              private local: LocalStorageService) {

    const lang = local.getValue(LocalStorageService.langKey);
    if (lang) {
      translate.use(lang);
    }

  }
  ngOnInit(): void {
  }

}
