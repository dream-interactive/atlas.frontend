import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {OktaAuthService} from '@okta/okta-angular';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {
  constructor(private auth: OktaAuthService, public router: Router) {}

  async canLoad(route: Route, segments: UrlSegment[]): Promise<boolean | UrlTree> {
    const authenticated = await this.auth.isAuthenticated();
    if (authenticated) {
      const userClaims = await this.auth.getUser();
      return userClaims.groups.includes('Admins');
    }
    return false;
  }
}
