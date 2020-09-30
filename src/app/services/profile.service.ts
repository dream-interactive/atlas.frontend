import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from './auth.service';

export interface Auth0Profile {
  sub: string;
  nickname: string;
  name: string;
  picture: string;
}
export interface UserProfile extends Auth0Profile{
  id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // @ts-ignore
  private userProfileSubject$ = new BehaviorSubject<UserProfile>(null);
  profile$ = this.userProfileSubject$.asObservable();

  constructor(private authService: AuthService) {
    this.authService.userProfile$.subscribe(profile => {
      const up: UserProfile = {
        name: profile.name,
        nickname: profile.nickname,
        picture: profile.picture,
        sub: profile.sub
      };
      this.updateUserProfile(up);
    });
  }

  updateUserProfile(profile: UserProfile): void {
    this.userProfileSubject$.next(profile);
  }

}
