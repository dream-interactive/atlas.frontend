import {Injectable} from '@angular/core';
import {Task, TasksContainer} from '../../../shared/atlas/entity.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly uri = environment.uri;
  private readonly apiRoute = 'tasks';

  private taskCreatingSubject = new BehaviorSubject<boolean>(false);
  public taskCreating$ = this.taskCreatingSubject.asObservable();

  constructor(private http: HttpClient) { }


  create(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.uri}/${this.apiRoute}`, task);
  }
  findAllByAssignToId(UserId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.uri}/${this.apiRoute}/users/${UserId}`);
  }


  taskCreatingUpdate(value: boolean): void {
    this.taskCreatingSubject.next(value);
  }

}

