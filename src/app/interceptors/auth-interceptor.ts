/// import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
/// import {from, Observable} from 'rxjs';
/// import {mergeMap} from 'rxjs/operators';
/// import {AuthService} from '../services/auth.service';
/// import {Injectable} from '@angular/core';
/// import {environment} from '../../environments/environment';
///
/// @Injectable()
/// export class AuthInterceptor implements HttpInterceptor {
///   constructor(private authService: AuthService) {
///   }
///
///   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
///
///     return this.authService.isAuthenticated$.pipe(
///       mergeMap(
///         authenticated => {
///           if (authenticated) {
///             return this.authService.auth0Client$.pipe(
///               mergeMap(client => {
///                 return from(client.getTokenSilently({ audience: environment.audience })).pipe(
///                   mergeMap(token => {
///                     console.log('token', token);
///                     const authReq = req.clone({
///                       headers: req.headers.set('Authorization', `Bearer ${token}`)
///                     });
///                     return next.handle(authReq);
///                   })
///                 );
///               })
///             );
///           } else {
///             return next.handle(req);
///           }
///         }
///       )
///     );
///   }
/// }

// intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//   return from(this.handle(req, next));
// }
//
// async handle(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
//
//   const isAuthenticated = await this.authService.isAuthenticated$.toPromise();
//
//   if (isAuthenticated) {
//
//     const auth0Client = await this.authService.auth0Client$.toPromise();
//
//     const token = await auth0Client.getTokenSilently({ audience: environment.audience });
//     console.log('token', token);
//     const authReq = req.clone({
//       headers: req.headers.set('Authorization', `Bearer ${token}`)
    //     });
//     return next.handle(authReq).toPromise();
//
//   } else {
//     return next.handle(req).toPromise();
//   }
// }
