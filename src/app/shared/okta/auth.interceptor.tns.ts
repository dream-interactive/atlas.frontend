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

      const accessToken = 'eyJraWQiOiJ6eUZEMHdCM1hsYjEwMzVIWW15S0lFR0d0SXJvbHVrc2l0cUhuaFA4SGhVIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULkNyZHVXZllHWXJKWk83UWJmQlJqbXFTUUt1bVJFMnhKR3ZVc1BUR3VKdGsiLCJpc3MiOiJodHRwczovL2Rldi03ODYzNTUub2t0YS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJhcGk6Ly9kZWZhdWx0IiwiaWF0IjoxNjIzNjUxMjY1LCJleHAiOjE2MjM3Mzc2NjUsImNpZCI6IjBvYTFpdW01bDdSbE9iaUc3NHg3IiwidWlkIjoiMDB1MnY1anh2b0dYV3FRVHc0eDciLCJzY3AiOlsib3BlbmlkIiwiZW1haWwiLCJwcm9maWxlIl0sInN1YiI6Im8uY29vbGJhYmFAZ21haWwuY29tIiwiZ3JvdXBzIjpbIkV2ZXJ5b25lIl19.gK37sH-e0s4IM-JkJHyzjm0_Ihl2YmvkR8jKmPwvfSxfwe7QBQdloxTX4J-J_uxqGpJd5lTXbP_qrt6m2CxcNtYRxia7rwSIZAd3-NRGkoH1Hr7fjeUdB0mFzFy5IrMW_G8WCbCXUVC7p6jC4Znckz4NHqXxvwgbhXeWPWo-hJ4RLbaCv08xSBMY-eqH_4NmOY8chWWf_4vUDJCv42rQN1UJ_I5VmwYl95CxYaRaLYbdcrg6aRtoTtyHoLyhZwA3eVlMTQTudkddE5cZ8BXVeK9f0Eti143Ar8sIB8cDtijUPv_Q30g34ifyx2xQZXuVjGTCWYx4Fsc3rRaeXFU7KQ';
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    }
    return next.handle(request).toPromise();
  }
}
