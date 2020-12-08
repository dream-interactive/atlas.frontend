 import {Injectable} from '@angular/core';
 import {OktaAuthService} from '@okta/okta-angular';


 @Injectable({
   providedIn: 'root'
 })
 export class AuthService extends OktaAuthService{

 }
