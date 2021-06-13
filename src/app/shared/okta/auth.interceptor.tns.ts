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

      const accessToken = 'eyJraWQiOiJ6eUZEMHdCM1hsYjEwMzVIWW15S0lFR0d0SXJvbHVrc2l0cUhuaFA4SGhVIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULjZiNTNhWWwyd0FtbG1pODBMd2NmRURIakJYb2EzSHEtY2NWTjRjMk1kZnciLCJpc3MiOiJodHRwczovL2Rldi03ODYzNTUub2t0YS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNjIzNTAwMjQ3LCJleHAiOjE2MjM1ODY2NDcsImNpZCI6IjBvYTFpdW01bDdSbE9iaUc3NHg3IiwidWlkIjoiMDB1MnY1anh2b0dYV3FRVHc0eDciLCJzY3AiOlsib3BlbmlkIiwiZW1haWwiLCJwcm9maWxlIl0sInN1YiI6Im8uY29vbGJhYmFAZ21haWwuY29tIiwiZ3JvdXBzIjpbIkV2ZXJ5b25lIl19.lD9vFaRyN9cc1vBgDLZ88KAUusYyJhJJP7DCQYP4uskH_boFqGCQ2g0KBowcBFOU7ft8vawfHHSBN8xlWdEqWBBUlIJv9xNXRz1OidcbFdUnTaoq-y9rASFoX8gd7DuTHynsA-7tGeg6bq_iKRHUDUOzr4cbrenLJY691nyO5Zj04u96ummZkl7NmlMKQXlyt3s-jLY0vPcmZYaJo6CaXoMpnCLVP_FKHJmK0YcDXoD0FXE-CinQ6d-hmmj2fgN8mPSIYfp7FjnTtI43a2R2YLJP1D9ytOrxJ-nCBPAn8uLy82wx0gdBQ8K0iJxUwrwIXJakBAEa6IwbTYMpcEd_2w';
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    }
    return next.handle(request).toPromise();
  }
}
