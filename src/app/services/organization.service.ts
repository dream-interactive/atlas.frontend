import {Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY, Observable, throwError} from 'rxjs';
import {CrudService} from './crud.service';
import {HttpClient, HttpParams} from '@angular/common/http';
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
        if (profile.sub) {
          return this.findAllByUserId(profile.sub);
        } else {
          return EMPTY;
        }
      })
    ).subscribe(organizations => this.updateOrganizationsSubject(organizations));
  }

  updateOrganizationsSubject(organizations: Organization[]): void {
    this.organizationsSubject$.next(organizations);
  }

  save(organization: Organization): Observable<Organization> {
    return this.http.post<Organization>(`${this.URL}/organizations`, organization);
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

  findByOrganizationValidName(validName: string): Observable<Organization> {
    const params = {validName};
    return this.http.get<Organization>(`${this.URL}/organizations`, { params });
  }
}


