import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError, mergeMap} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import * as _ from 'lodash';

export interface Auth0Profile {
  sub: string;
  nickname: string;
  name: string;
  picture: string;
  updatedAt: string;
  email: string;
  emailVerified: boolean;
}
// tslint:disable-next-line:no-empty-interface
export interface UserProfile extends Auth0Profile{
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  userProfile: UserProfile = {
    email: '', emailVerified: false, name: '', nickname: '', picture: '', sub: '', updatedAt: ''
  };

  private URL = environment.uri;

  private userProfileSubject$ = new BehaviorSubject<UserProfile>(this.userProfile);
  profile$ = this.userProfileSubject$.asObservable();

  constructor(private authService: AuthService,
              private http: HttpClient) {
    authService
      .getUser$()
      .pipe(
        mergeMap(profile => {
          if (profile) { // if profile doesn't exist, for example when user doesn't login
            const up: UserProfile = {
              email: profile.email,
              emailVerified: profile.email_verified,
              updatedAt: profile.updated_at,
              name: profile.name,
              nickname: profile.nickname,
              picture: profile.picture,
              sub: profile.sub
            };
            return this.findById(up.sub).pipe(
              mergeMap((result) => { // if user exist in database
                if (result.emailVerified === up.emailVerified) {
                  return of(result);
                } else {
                  result.emailVerified = up.emailVerified;
                  return this.update(result); // update just emailVerified
                }
              }),
              catchError(err => {
                if (err.error.message.match('ATLAS-12')) { // if error 404 match ATLAS-12
                  return this.create(up); // create user in db
                }
                else {
                  console.log('Error:', err.error.message);
                  return throwError(err);
                }
              })
            );
          } else {
            return of(this.userProfile);
          }
        })
      )
      .subscribe(profile => {
        this.userProfileSubject$.next(profile);
      });
  }

  updateUserProfileSubject(profile: UserProfile): void {
    this.userProfileSubject$.next(profile);
  }

  findById(id: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.URL}/users/${id}`);
  }
  create(user: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${this.URL}/users`, user);
  }
  update(user: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.URL}/users`, user);
  }
}


