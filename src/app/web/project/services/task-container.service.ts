import {Injectable} from '@angular/core';
import {CrudService} from '../../../shared/crud.service';
import {Project, ProjectMember, Task, TasksContainer} from '../../../shared/atlas/entity.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskContainerService implements CrudService<TasksContainer, number> {

  private readonly uri = environment.uri;
  private readonly apiRoute = 'tasks-containers';

  private tasksContainersSubject = new BehaviorSubject<TasksContainer[]>([]);
  public tasksContainers$ = this.tasksContainersSubject.asObservable();

  private containers: TasksContainer[] = [];

  constructor(private http: HttpClient) {
  }

  create(container: TasksContainer): Observable<TasksContainer> {
    return this.http.post<TasksContainer>(`${this.uri}/${this.apiRoute}`, container)
      .pipe(tap(c => this.containers.push(c)));
  }

  update(container: TasksContainer): Observable<TasksContainer> {
    return this.http.put<TasksContainer>(`${this.uri}/${this.apiRoute}`, container)
      .pipe(tap(cr => {
        for (const [index, c] of this.containers.entries()) {
          if (c.idtc === cr.idtc) {
            this.containers[index] = cr;
          }
        }
      }));
  }

  delete(idtc: number): Observable<void> {
    return this.http.delete<void>(`${this.uri}/${this.apiRoute}/${idtc}`).pipe(
      tap(() => {
        for (const [index, c] of this.containers.entries()) {
          if (c.idtc === idtc) {
            this.containers.slice(index, 1);
            return;
          }
        }
      })
    );
  }

  findAll(): Observable<TasksContainer[]> {
    return undefined;
  }

  findById(idc: number): Observable<TasksContainer> {
    return undefined;
  }

  findAllByProjectId(idp: string): Observable<TasksContainer[]> {
    return this.http.get<TasksContainer[]>(`${this.uri}/${this.apiRoute}/projects/${idp}`).pipe(
      tap(cs => {
        this.containers = cs;
        this.updateContainers(cs);
      })
    );
  }

  updateContainers(containers: TasksContainer[]): void {
    this.tasksContainersSubject.next(containers);
  }

  moveTask(tasks: Task[], idtc: number): Observable<TasksContainer> {
    for (const [index, task] of tasks.entries()) {
      task.idtc = idtc;
      if (task.indexNumber !== index) {
        task.indexNumber = index;
      }
    }
    return this.http.put<TasksContainer>(`${this.uri}/${this.apiRoute}/${idtc}/move`, tasks);
  }

  /**
   * Move task form previous container to current container.
   *
   * @return Observable<TasksContainer[]> with two TaskContainer (current and previous)
   */
  transferTask(currentTasks: Task[], currentIdtc: number, previousIdtc: number, previousTasks: Task[]): Observable<TasksContainer[]> {

    for (const [index, task] of currentTasks.entries()) {
      task.idtc = currentIdtc;
      if (task.indexNumber !== index) {
        task.indexNumber = index;
      }
    }
    for (const [index, task] of previousTasks.entries()) {
      task.idtc = previousIdtc;
      if (task.indexNumber !== index) {
        task.indexNumber = index;
      }
    }

    return this.http.put<TasksContainer[]>(`${this.uri}/${this.apiRoute}/transfer`, {
      currentIdtc,
      previousIdtc,
      currentTasks,
      previousTasks
    });
  }

  taskFilter(search: string, member: ProjectMember, label: string, project: Project): void {

    const fc: TasksContainer[] = [];

    for (const tasksContainer of this.containers) {
      fc.push({...tasksContainer});
    }

    fc.forEach(c => {
      c.tasks = c.tasks
        .filter(task => this.filterBySearch(search, project, task))
        .filter(task => this.filterByMember(member, task))
        .filter(task => this.filterByLabel(label, task));
    });

    this.updateContainers(fc);
  }


  private filterBySearch(search: string, project: Project, task: Task): boolean {
    if (search.trim() && search.length > 2) {

      search = search.toLowerCase();
      const key = `${project.key}-${task.keyNumber}`.toLowerCase();
      const summary = task.summary.toLowerCase();

      if (summary.includes(search)) {
        return true;
      } else if (key.includes(search)) {
        return true;
      } else {
        return false;
      }
    }

    return true; // if search field empty
  }

  private filterByMember(member: ProjectMember, task: Task): boolean {
    if (member) {
      return task.assignToId === member.user.sub;
    }
    return true;
  }

  private filterByLabel(label: string, task: Task): boolean {

    if (label) {
      return task.labels.includes(label);
    }

    return true;
  }

}
