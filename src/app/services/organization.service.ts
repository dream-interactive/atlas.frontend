import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {CrudService} from './crud.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ProfileService} from './profile.service';
import {environment} from '../../environments/environment';
import {catchError, mergeMap} from 'rxjs/operators';

export interface Organization {
  id?: string;
  name: string;
  validName: string;
  img?: string;
  ownerUserId: string; // ID user which create organization
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationService implements CrudService<Organization, string> {

  private organizationsSubject$ = new BehaviorSubject<Organization[]>([]);
  userOrganizations$ = this.organizationsSubject$.asObservable();

  private URL = environment.uri;

  constructor(private http: HttpClient, profileService: ProfileService) {
    profileService.profile$.pipe(
      mergeMap((profile) => {
        return this.findAllByUserId(profile.sub);
      })
    ).subscribe(organizations => this.updateUserOrganizationsSubject(organizations));
  }

  updateUserOrganizationsSubject(organizations: Organization[]): void {
    console.log('organizations', organizations);
    this.organizationsSubject$.next(organizations);
  }

  save(organization: Organization): Observable<Organization> {
    return this.http.post<Organization>(`${this.URL}/organizations`, organization).pipe(
      catchError(err => {
        console.log('Error:', err.error.message);
        return throwError(err);
      })
    );
  }

  delete(id: string): void {
  }

  findAllByUserId(userId: string): Observable<Organization[]> {

    const params = new HttpParams().set('userId', userId);

    return  this.http.get<Organization[]>(`${this.URL}/organizations`, { params }).pipe(
      catchError(err => {
        console.log('Error:', err.error.message);
        return throwError(err);
      })
    );
  }

  findAll(): Observable<Organization[]> {
    return null;
  }

  findById(id: string): Observable<Organization> {
    //  return  this.http.get<Organization>(`${URL}/api/organization/${id}`)
    return null;
  }

  existByValidName(validName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.URL}/organizations?validName=${validName}`);
  }

}


