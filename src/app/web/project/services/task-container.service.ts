import { Injectable } from '@angular/core';
import {CrudService} from '../../../shared/crud.service';
import {TasksContainer} from '../../../shared/atlas/entity.service';
import {Observable, ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskContainerService implements CrudService<TasksContainer, number>{

  readonly uri = environment.uri;
  readonly apiRoute = 'issues-containers';

  private issuesContainers = new ReplaySubject<TasksContainer[]>(1);
  public taskContainers$ = this.issuesContainers.asObservable();

  constructor(private http: HttpClient) { }

  create(container: TasksContainer): Observable<TasksContainer> {
    return this.http.post<TasksContainer>(`${this.uri}/${this.apiRoute}`, container);
  }

  update(container: TasksContainer): Observable<TasksContainer> {
    return undefined;
  }

  delete(idc: number): void {
  }

  findAll(): Observable<TasksContainer[]> {
    return undefined;
  }

  findById(idc: number): Observable<TasksContainer> {
    return undefined;
  }
  findAllByProjectId(idp: string): Observable<TasksContainer[]> {
    return this.http.get<TasksContainer[]>(`${this.uri}/${this.apiRoute}/projects/${idp}`);
  }

  updateContainers(containers: TasksContainer[]): void {
    this.issuesContainers.next(containers);
  }
}
