import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CrudService} from './crud.service';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError, mergeMap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {ProfileService} from './profile.service';

export interface Project {
  id?: string;
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
export class ProjectService implements CrudService<Project, string>{

  private projectsSubject$ = new BehaviorSubject<Project[]>([]);
  projects$ = this.projectsSubject$.asObservable();

  private uri = environment.uri;

  constructor(private http: HttpClient, profileService: ProfileService) {
    profileService.profile$.pipe(
      mergeMap((profile) => {
        return this.findAllByUserId(profile.sub);
      })
    ).subscribe((projects) => this.updateProjects(projects));
  }

  updateProjects(projects: Project[]): void {
    this.projectsSubject$.next(projects);
  }


  save(project: Project): Observable<Project> {


    if (project.id) {

      return this.http.put<Project>(`${this.uri}/projects`, project).pipe(
        catchError(err => {
          console.log('Error:', err.error.message);
          return throwError(err);
        })
      );
    }

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post<Project>(`${this.uri}/projects`, project, {headers}).pipe(
      catchError(err => {
        console.log('Error:', err.error.message);
        return throwError(err);
      })
    );
  }

  findAllByUserId(id: string): Observable<Project[]> {
    const params = new HttpParams().set('userId', id);

    return this.http.get<Project[]>(`${this.uri}/projects`, {params}).pipe(
      catchError(err => {
        console.log('Error:', err.error.message);
        return throwError(err);
      })
    );
  }

  findByOrganizationId(id: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.uri}/projects?organizationId=${id}`).pipe(
      catchError(err => {
        console.log('Error:', err.error.message);
        return throwError(err);
      })
    );
  }

  isExist(organizationId: string, projectName: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.uri}/projects?organizationId=${organizationId}&projectName=${projectName}`).pipe(
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

  findAll(): Observable<Project[]> {
    return undefined;
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.uri}/projects/${id}`).pipe(
      catchError(err => {
        console.log('Error:', err.error.message);
        return throwError(err);
      })
    );
  }

}
