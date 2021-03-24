import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {CrudService} from '../shared/crud.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Organization} from '../shared/atlas/entity.service';


// TODO Перенести

@Injectable({
  providedIn: 'root'
})
export class OrganizationService implements CrudService<Organization, string> {

  private organizationsSubject$ = new BehaviorSubject<Organization[]>([]);
  userOrganizations$ = this.organizationsSubject$.asObservable();

  private URL = environment.uri;

  constructor(private http: HttpClient) {}

  updateOrganizationsSubject(organizations: Organization[]): void {
    this.organizationsSubject$.next(organizations);
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



  findByOrganizationValidName(validName: string): Observable<Organization> {
    const params = {validName};
    return this.http.get<Organization>(`${this.URL}/organizations`, { params });
  }

  create(organization: Organization): Observable<Organization> {
    return this.http.post<Organization>(`${this.URL}/organizations`, organization);
  }

  update(organization: Organization): Observable<Organization> {
    return this.http.put<Organization>(`${this.URL}/organizations`, organization);
  }

  findAll(): Observable<Organization[]> {
    return null;
  }

  findById(id: string): Observable<Organization> {
    //  return  this.http.get<Organization>(`${URL}/api/organization/${id}`)
    return null;
  }
}


