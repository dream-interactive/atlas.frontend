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

      const accessToken = 'eyJraWQiOiJ6eUZEMHdCM1hsYjEwMzVIWW15S0lFR0d0SXJvbHVrc2l0cUhuaFA4SGhVIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULktEQ0RDS1BVems4dno0UXpzZGZ4aXE0bFMtakhfYWRPLXVGZ3lIYVExek0iLCJpc3MiOiJodHRwczovL2Rldi03ODYzNTUub2t0YS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNjIyOTg5MjA0LCJleHAiOjE2MjMwNzU2MDQsImNpZCI6IjBvYTFpdW01bDdSbE9iaUc3NHg3IiwidWlkIjoiMDB1MnY1anh2b0dYV3FRVHc0eDciLCJzY3AiOlsiZW1haWwiLCJvcGVuaWQiLCJwcm9maWxlIl0sInN1YiI6Im8uY29vbGJhYmFAZ21haWwuY29tIiwiZ3JvdXBzIjpbIkV2ZXJ5b25lIl19.Mo9neWzXSEhvGu191u4rb12R-jZRZi2Aj3EmKt3dJ0uRRgR-7rMNS4rA1z6ehoiTU38K-jvCA5geBt07csWq_qQ3OxA3_B7F7iW64Ov_x8v979OA3h5cnHJfXqhs-lWkFG2Ksq2om214NHyFK3seXnLjBcaUJxLJ5Ur8Dtuk1JinyNn08eGbuFQ3cxsnDDh8yZZwf8hnYOFi9KPgOVfaGOnvJ93PB54Lt05O1B4Xur8n291H7rG1kjcI6HdrcrOFqkTJPjVE91jnaHhkyZXWcECDO67w5IBPEMLjLoS9XYwvIpnPS2zVMJ5QXU2XIX7IEg-aCNxUyCdaivzUJ3nUxQ';
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    }
    return next.handle(request).toPromise();
  }
}
