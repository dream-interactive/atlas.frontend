import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CrudService} from './crud.service';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';

export interface Project {
  id: string;
  organizationId: string;
  name: string;
  key: string;
  type: ProjectType;
  issuesTypes: any[]; // TODO
  img: string;
}

export enum ProjectType {
  SCRUM, KANBAN
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements CrudService<Project, string>{

  uri = environment.uri;

  constructor(private http: HttpClient) { }


  save(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.uri}/projects`, project).pipe(
      catchError(err => {
        console.log('Error:', err.error.message);
        return throwError(err);
      })
    );
  }

  findByUserId(id: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.uri}/projects?userId=${id}`).pipe(
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
