import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {OktaAuthService} from '@okta/okta-angular';

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

  constructor(private oktaAuth: OktaAuthService,
              private http: HttpClient) {
    // authService
    //   .getUser$()
    //   .pipe(
    //     mergeMap(profile => {
    //       if (profile) {
    //         const up: UserProfile = {
    //           email: profile.email,
    //           emailVerified: profile.email_verified,
    //           updatedAt: profile.updated_at,
    //           name: profile.name,
    //           nickname: profile.nickname,
    //           picture: profile.picture,
    //           sub: profile.sub
    //         };
    //         return this.findById(up.sub).pipe(
    //           mergeMap((result) => { // if user exist in database
    //             if (result.emailVerified === up.emailVerified) {
    //               return of(result);
    //             } else {
    //               result.emailVerified = up.emailVerified;
    //               return this.update(result); // update just emailVerified
    //             }
    //           }),
    //           catchError(err => {
    //             console.log('err', err);
    //             if (err.error.message.match('ATLAS-12')) { // if error 404 match ATLAS-12
    //               return this.create(up); // create user in db
    //             }
    //             else {
    //               console.log('Error:', err.error.message);
    //               return throwError(err);
    //             }
    //           })
    //         );
    //       } else {  // if profile doesn't exist, for example when user doesn't login
    //         return EMPTY; // of(this.userProfile);
    //       }
    //     })
    //   )
    //   .subscribe(profile => {
    //     this.userProfileSubject$.next(profile);
    //   });
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


