import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable, throwError} from 'rxjs';
import {catchError, flatMap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authService.isAuthenticated$.pipe(
      flatMap(
        authenticated => {
          if (authenticated) {
            return this.authService.auth0Client$.pipe(
              flatMap(client => {
                const claims$ = from(client.getIdTokenClaims());
                return claims$.pipe(
                  flatMap(c => {
                    const authReq = req.clone({
                      headers: req.headers.set('Authorization', `Bearer ${c.__raw}`)
                    });
                    return this.newHttpEvent(authReq, next);
                  })
                );
              })
            );
          } else {
            return this.newHttpEvent(req, next);
          }
        }
      )
    );
  }

  private newHttpEvent(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
          console.log('Error:', err.error.message);
          return throwError(err);
      })
    );
  }
}
