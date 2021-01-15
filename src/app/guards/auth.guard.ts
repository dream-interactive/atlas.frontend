import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {OktaAuthService} from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: OktaAuthService, public router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const authenticated = await this.auth.isAuthenticated();
    if (authenticated) { return true; }

    // Redirect to login flow.
    await this.auth.signInWithRedirect();
    return false;
  }
}
