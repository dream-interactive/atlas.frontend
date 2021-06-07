import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
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
    const allowedOrigins = ['http://10.0.2.2'];
    if (allowedOrigins.some(url => request.urlWithParams.includes(url))) {
      const accessToken = 'eyJraWQiOiJ6eUZEMHdCM1hsYjEwMzVIWW15S0lFR0d0SXJvbHVrc2l0cUhuaFA4SGhVIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULi03ZnNoLU5HcC05UFdjSVhoY0pjNWJDejQ5RFFiMGtyQmxSdTVyb3lfX1UiLCJpc3MiOiJodHRwczovL2Rldi03ODYzNTUub2t0YS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNjIyODA1NzUwLCJleHAiOjE2MjI4OTIxNTAsImNpZCI6IjBvYTFpdW01bDdSbE9iaUc3NHg3IiwidWlkIjoiMDB1MnY1anh2b0dYV3FRVHc0eDciLCJzY3AiOlsiZW1haWwiLCJwcm9maWxlIiwib3BlbmlkIl0sInN1YiI6Im8uY29vbGJhYmFAZ21haWwuY29tIiwiZ3JvdXBzIjpbIkV2ZXJ5b25lIl19.Hb2fMaJW0tCAD-M1jno6VjovYNtF4ssqXTTE1A-loSh5gtxmwfV3h4ENBF-ddw1mkkLsNOPjMaK9Y5GKm_N7Mt8Obwiq_BVO7lgzcPoLEfcn-E3aEp3I73GZdAXoZAdrX-FOszpK9XQt6RCYqls2Fp5KtDavgpWnx_Hhsp3EPhlG47KgfxwmwEpkErZm83UbyEswcCljZKHVHjoZiooO2U9ztJ_ulMX5b3ABEbBXGWvkh4ju1viYrR6KombKn8vYykBp3PhE4upvOj9InGIkBePxcU0n2ZywNQF95VEgY4ibHVYBmvAd_gEvaKRKL5869pHfuKTUEUK-wH0TCEwDoQ';
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    }
    return next.handle(request).toPromise();
  }
}
