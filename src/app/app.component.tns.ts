import { Component } from '@angular/core';
import {DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition} from 'nativescript-ui-sidedrawer';
import {RouterExtensions} from '@nativescript/angular';
import {NavigationEnd, Router} from '@angular/router';
import {Application} from '@nativescript/core';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.tns.html',
})
export class AppComponent {
  private _activatedUrl: string;
  private _sideDrawerTransition: DrawerTransitionBase;

  constructor(private router: Router, private routerExtensions: RouterExtensions) {
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
        name: 'fade',
      },
    });

    const sideDrawer = <RadSideDrawer> Application.getRootView();
    sideDrawer.closeDrawer();
  }

}
