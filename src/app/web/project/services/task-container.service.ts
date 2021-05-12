import { Injectable } from '@angular/core';
import {CrudService} from '../../../shared/crud.service';
import {TasksContainer} from '../../../shared/atlas/entity.service';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskContainerService implements CrudService<TasksContainer, number>{

  private readonly uri = environment.uri;
  private readonly apiRoute = 'tasks-containers';

  private tasksContainersSubject = new BehaviorSubject<TasksContainer[]>([]);
  public tasksContainers$ = this.tasksContainersSubject.asObservable();

  constructor(private http: HttpClient) { }

  create(container: TasksContainer): Observable<TasksContainer> {
    return this.http.post<TasksContainer>(`${this.uri}/${this.apiRoute}`, container);
  }

  update(container: TasksContainer): Observable<TasksContainer> {
      return this.http.put<TasksContainer>(`${this.uri}/${this.apiRoute}`, container);
  }

  delete(idc: number): Observable<void> {
    return this.http.delete<void>(`${this.uri}/${this.apiRoute}/${idc}`);
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
    this.tasksContainersSubject.next(containers);
  }
}
