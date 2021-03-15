import {Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY, from, Observable, of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {OktaAuthService} from '@okta/okta-angular';
import {catchError, mergeMap, startWith, switchMap} from 'rxjs/operators';
import {Data} from '@angular/router';


// tslint:disable-next-line:no-empty-interface
export interface AtlasUserAuth { // Okta User Profile
  email: string;
  emailVerified: boolean;
  familyName: string;
  givenName: string;
  name: string;
  sub: string;
  local: string;
}

export interface AtlasUser extends AtlasUserAuth {
  lastModify: Data;
  userPicture: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private URL = environment.uri;

  private userProfileSubject$ = new BehaviorSubject<AtlasUser>({
    email: '',
    emailVerified: false,
    familyName: '',
    givenName: '',
    lastModify: undefined,
    local: '',
    name: '',
    sub: '',
    userPicture: ''
  } as AtlasUser);
  profile$ = this.userProfileSubject$.asObservable();

  constructor(private oktaAuth: OktaAuthService,
              private http: HttpClient) {
    this.oktaAuth.$authenticationState.pipe(
      switchMap((isAuthenticated) => {
        if (isAuthenticated) {
          if (!environment.production) {
            console.log(oktaAuth.getAccessToken());
          }
          return from(oktaAuth.getUser()).pipe( // get user
            mergeMap(profile => {
              if (profile) {
                const up: AtlasUserAuth = {
                  sub: profile.sub,
                  email: profile.email,
                  emailVerified: profile.email_verified,
                  familyName: profile.family_name,
                  givenName: profile.given_name,
                  name: profile.name,
                  local: this.getLocal()
                };
                return this.findAtlasUserAuthById(profile.sub).pipe(
                  mergeMap((result) => { // if user exist in database
                    if (result.emailVerified === profile.email_verified) {
                      return this.findAtlasUserById(result.sub);
                    } else {
                      result.emailVerified = profile.email_verified;
                      return this.updateEmailVerification(result) // update just emailVerified
                        .pipe(
                          mergeMap((userAuth) => {
                            return this.findAtlasUserById(userAuth.sub);
                          })
                        );
                    }
                  }),
                  catchError(err => {
                    if (err.error && err.error.message.match('ATLAS-901')) { // if error 404 match ATLAS-901
                      return this.create(up) // create user in db
                        .pipe(
                          mergeMap((userAuth) => {
                            return this.findAtlasUserById(userAuth.sub);
                          })
                        );
                    } else {
                      return throwError(err);
                    }
                  })
                );
              } else {
                return EMPTY; // if profile doesn't exist, for example when user doesn't login
              }
            })
          );
        } else {
          return EMPTY; // if profile doesn't exist, for example when user doesn't login
        }
      })
    )
      .subscribe((user) => {
        this.userProfileSubject$.next(user as AtlasUser);
      });
  }

  updateUserProfileSubject(profile: AtlasUser): void {
    this.userProfileSubject$.next(profile);
  }

  findAtlasUserAuthById(id: string): Observable<AtlasUserAuth> {
    const params = {sub: id};
    return this.http.get<AtlasUserAuth>(`${this.URL}/users/auth`, {params});
  }

  updateEmailVerification(user: AtlasUserAuth): Observable<AtlasUserAuth> {
    return this.http.put<AtlasUserAuth>(`${this.URL}/users/email_verification`, user);
  }

  create(user: AtlasUserAuth): Observable<AtlasUserAuth> {
    return this.http.post<AtlasUserAuth>(`${this.URL}/users`, user);
  }

  findAtlasUserById(id: string): Observable<AtlasUser> {
    return this.http.get<AtlasUser>(`${this.URL}/users/${id}`);
  }

  update(user: AtlasUser): Observable<AtlasUser> {
    return this.http.put<AtlasUser>(`${this.URL}/users`, user);
  }

  getLocal(): string {
    return navigator.languages !== undefined ? navigator.languages[0] : 'en';
  }
}


