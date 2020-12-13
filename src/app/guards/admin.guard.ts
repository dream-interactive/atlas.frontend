import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {OktaAuthService} from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: OktaAuthService, public router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const authenticated = await this.auth.isAuthenticated();
    if (authenticated) {
      const userClaims = await this.auth.getUser();
      return userClaims.groups.includes('Admins');
    }

    // Redirect to login flow.
    await this.auth.signInWithRedirect();
    return false;
  }
}
