import { Component } from '@angular/core';
import {DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition} from 'nativescript-ui-sidedrawer';
import {NavigationEnd, Router} from '@angular/router';
import {RouterExtensions} from '@nativescript/angular';
import {filter} from 'rxjs/operators';
import {Application} from '@nativescript/core';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from '@src/app/shared/local-storage.service';
require ('nativescript-localstorage');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private _activatedUrl: string;
  private _sideDrawerTransition: DrawerTransitionBase;

  constructor(private router: Router,
              private routerExtensions: RouterExtensions,
              private local: LocalStorageService,
              private translate: TranslateService


  ) {
    const lang = local.getValue(LocalStorageService.langKey);
    if (lang) {
      translate.use(lang);
    }
    // Use the component constructor to inject services.
  }

  ngOnInit(): void {
    this._activatedUrl = '/organization';
    this._sideDrawerTransition = new SlideInOnTopTransition();

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => (this._activatedUrl = event.urlAfterRedirects));
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url;
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name:  'fade',
      },
    });

    const sideDrawer = Application.getRootView() as RadSideDrawer;
    sideDrawer.closeDrawer();
  }

}
