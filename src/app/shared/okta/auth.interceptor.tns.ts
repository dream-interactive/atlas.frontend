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

      const accessToken = 'eyJraWQiOiJ6eUZEMHdCM1hsYjEwMzVIWW15S0lFR0d0SXJvbHVrc2l0cUhuaFA4SGhVIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULjhCZWd5RThXN0gtYTNLYWtLRTM5UnNFSm1xLTFhYmdxNFBSSUpsaWdDeGciLCJpc3MiOiJodHRwczovL2Rldi03ODYzNTUub2t0YS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNjIzNzM1Mjc2LCJleHAiOjE2MjM4MjE2NzYsImNpZCI6IjBvYTFpdW01bDdSbE9iaUc3NHg3IiwidWlkIjoiMDB1MnY1anh2b0dYV3FRVHc0eDciLCJzY3AiOlsicHJvZmlsZSIsIm9wZW5pZCIsImVtYWlsIl0sInN1YiI6Im8uY29vbGJhYmFAZ21haWwuY29tIiwiZ3JvdXBzIjpbIkV2ZXJ5b25lIl19.Pa39SHJ9KlYpjojHDlIk4vQ6LS6GHSXI3Kz9whk5xAK27SieDWYpi_--zEhRHGFdzQk880Vnad-NfGNqKyYxqPpxtTKKk_8zKP-66ovGJvbIM_3xLNoc2NoNxBJyfBJw4_iLyeFIe5U74a5bBEonCpYaLu6j0frLtgvMQad6Ir4wjHTnGus5tcdzfFbgvkf07XocVsS6Vd9Yj4V8hwOg6vDhL4qOgaJKeWsiMZVD116hvkK9bw0r-ODCxEMDFhNHcLALWOgRBx-ns70xy6gunMBO0YQy_euSJ_U9nl5KJepxMZ83pmcpyUehhLKeR4Rn_jyo5YR9fFjEsL5pJnTujQ';
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    }
    return next.handle(request).toPromise();
  }
}
