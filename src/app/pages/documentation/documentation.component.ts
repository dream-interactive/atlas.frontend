import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {

  haveAccess = false;
  opened = true;

  constructor(private oktaAuth: OktaAuthService) { }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    const authenticated = await this.oktaAuth.isAuthenticated();
    if (authenticated) {
      const userClaims = await this.oktaAuth.getUser();
      this.haveAccess = userClaims.groups.includes('Admins');
    }
  }

}
