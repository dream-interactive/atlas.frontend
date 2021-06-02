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
    const allowedOrigins = ['http://localhost'];
    if (allowedOrigins.some(url => request.urlWithParams.includes(url))) {
      const accessToken = 'eyJraWQiOiJ6eUZEMHdCM1hsYjEwMzVIWW15S0lFR0d0SXJvbHVrc2l0cUhuaFA4SGhVIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlBmeWlTRmJzVjBRRUY2VXFNdEdvcXVncnRCLWxudnBHcjJiVVFteUxrQ00iLCJpc3MiOiJodHRwczovL2Rldi03ODYzNTUub2t0YS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNjIyNjU1OTUxLCJleHAiOjE2MjI3NDIzNTEsImNpZCI6IjBvYTFpdW01bDdSbE9iaUc3NHg3IiwidWlkIjoiMDB1MnY1anh2b0dYV3FRVHc0eDciLCJzY3AiOlsicHJvZmlsZSIsIm9wZW5pZCIsImVtYWlsIl0sInN1YiI6Im8uY29vbGJhYmFAZ21haWwuY29tIiwiZ3JvdXBzIjpbIkV2ZXJ5b25lIl19.N-pVYrqhTMAahmccTck4qnWCJW75f5kF2H40Ixg3ny3CSUHLgmR1XKIswSHpC3rsJ-ODoh7rBDZNrnd9E9YkpRHlXWer1EEuGZN6fnPCv91dZyK_NE0LQYnS7KXDpJX8YVWyFQqhOK7AhOZ3jltHqfTTA6DI1mGnV8hx0HLu496vytcwSqCkL8ZEn5q2BhHuxwXnT7L65mcteW3FQJAXYK3Z6LsrwgkgXd2XgBD8pTtBTZELzTLQbEJd1kiDGViwHLqBnbDwDiLOG1zklJZA018c8RSRAvPWLoRW5Rap4RbkK5IkVKR5_B-VKs1Bv7LX0RlTjtOYS1ryClWPXQ53oA';
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    }
    return next.handle(request).toPromise();
  }
}
