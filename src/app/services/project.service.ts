import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CrudService} from './crud.service';
import {BehaviorSubject, EMPTY, Observable, ReplaySubject, Subject, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, concatMap, mergeMap, switchMap} from 'rxjs/operators';
import {ProfileService} from './profile.service';

export interface Project {
  idp?: string;
  name: string;
  key: string;
  organizationId: string;
  type: ProjectType;
  leadId: string;
  img?: string;
  isPrivate?: boolean;
}

export enum ProjectType {
  SCRUM, KANBAN
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements CrudService<Project, string> {

  private projectsSubject$ = new BehaviorSubject<Project[]>([]);
  projects$ = this.projectsSubject$.asObservable();
  private projectSubject$ = new ReplaySubject<Project>(1);
  project$ = this.projectSubject$.asObservable();

  private uri = environment.uri;

  constructor(private http: HttpClient) {}

  updateProjectsSubject(projects: Project[]): void {
    this.projectsSubject$.next(projects);
  }

  updateProjectSubject(project: Project): void {
    this.projectSubject$.next(project);
  }


  findAllByUserId(id: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.uri}/projects/users/${id}`).pipe(
      catchError(err => {
        console.log('Error:', err.error.message);
        return throwError(err);
      })
    );
  }

  findByOrganizationId(id: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.uri}/projects/organizations/${id}`).pipe(
      catchError(err => {
        console.log('Error:', err.error.message);
        return throwError(err);
      })
    );
  }

  findById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.uri}/projects/${id}`).pipe(
      catchError(err => {
        console.log('Error:', err.error.message);
        return throwError(err);
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.uri}/projects/${id}`).pipe(
      catchError(err => {
        console.log('Error:', err.error.message);
        return throwError(err);
      })
    );
  }

  findByOrganizationIdAndProjectKey(organizationId: string, key: string): Observable<Project> {
    const params = {organizationId, key};
    return this.http.get<Project>(`${this.uri}/projects`, {params});
  }

  /**
   * @param ovn - organization valid name
   * @param pk - project key
   */
  findByOrganizationValidNameAndProjectKey(ovn: string, pk: string): Observable<Project[]> {
    const params = {ovn, pk};
    return this.http.get<Project[]>(`${this.uri}/projects`, {params});
  }

  findAll(): Observable<Project[]> {
    return undefined;
  }

  create(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.uri}/projects`, project).pipe(
      catchError(err => {
        console.log('Error:', err.error.message);
        return throwError(err);
      })
    );
  }

  update(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.uri}/projects`, project).pipe(
      catchError(err => {
        console.log('Error:', err.error.message);
        return throwError(err);
      })
    );
  }

}
