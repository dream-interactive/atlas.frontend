import {Injectable} from '@angular/core';
import {Task} from '../../../shared/atlas/entity.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly uri = environment.uri;
  private readonly apiRoute = 'tasks';

  constructor(private http: HttpClient) { }


  create(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.uri}/${this.apiRoute}`, task);
  }
}
