import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { OktaAuthService } from '@okta/okta-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    // Only add an access token to whitelisted origins
    const allowedOrigins = ['http://localhost'];
    if (allowedOrigins.some(url => request.urlWithParams.includes(url))) {
      const accessToken = 'eyJraWQiOiJ6eUZEMHdCM1hsYjEwMzVIWW15S0lFR0d0SXJvbHVrc2l0cUhuaFA4SGhVIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULmRTRnd1Rk5nZnJQMHpXUGFhSVpKRTRyUU5MaDNtSGh5b0Y5ZFMxS2pJWnMiLCJpc3MiOiJodHRwczovL2Rldi03ODYzNTUub2t0YS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNjIyMjc5MDYyLCJleHAiOjE2MjIzNjU0NjIsImNpZCI6IjBvYTFpdW01bDdSbE9iaUc3NHg3IiwidWlkIjoiMDB1MnY1anh2b0dYV3FRVHc0eDciLCJzY3AiOlsiZW1haWwiLCJvcGVuaWQiLCJwcm9maWxlIl0sInN1YiI6Im8uY29vbGJhYmFAZ21haWwuY29tIiwiZ3JvdXBzIjpbIkV2ZXJ5b25lIl19.U0Ga8R9Rp1Yvsf9MfU0pk6pyGVxw1j5vLS4WoAJKf5KONUc3jmK3Cu9hvFQzo_19zqTgLf2q_qp6aCSf7JPBVraPLTN-0Wd9cHlHoe_pqaP8A1W8cTuuT_mMROr5SuT8NFGx4GHy2LvSax96DFI7qEYbMZu6s0UzYvZNahBe9Cc_H9Noqb6daM9cJwloZkrrwaTw6xE-5TjNnPmXy8ljcDJKbwwWFSxgJK-XhZEuq97yj4jbt6QXmkEgAZju5tDTldfupogkUMKT5xNPHOSxCx1b489nEWhrG-q9nfAP34xDEvNb1_AlbJBkqHNMF5aGfWoeg8gAUkWi_Fr68_lvMg';
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    }
    return next.handle(request).toPromise();
  }
}
