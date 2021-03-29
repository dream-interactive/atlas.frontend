import { Injectable } from '@angular/core';
import {CrudService} from '../../../shared/crud.service';
import {IssuesContainer} from '../../../shared/atlas/entity.service';
import {Observable, ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssuesContainerService implements CrudService<IssuesContainer, number>{

  private uri = environment.uri;
  private apiRoute = 'issues-containers';

  private issuesContainers = new ReplaySubject<IssuesContainer[]>(1);
  public issuesContainers$ = this.issuesContainers.asObservable();

  constructor(private http: HttpClient) { }

  create(container: IssuesContainer): Observable<IssuesContainer> {
    return this.http.post<IssuesContainer>(`${this.uri}/${this.apiRoute}`, container);
  }
  update(container: IssuesContainer): Observable<IssuesContainer> {
    return undefined;
  }

  delete(idc: number): void {
  }

  findAll(): Observable<IssuesContainer[]> {
    return undefined;
  }

  findById(idc: number): Observable<IssuesContainer> {
    return undefined;
  }
  findAllByProjectId(idp: string): Observable<IssuesContainer[]> {
    return this.http.get<IssuesContainer[]>(`${this.uri}/${this.apiRoute}/projects/${idp}`);
  }

  updateContainers(containers: IssuesContainer[]): void {
    this.issuesContainers.next(containers);
  }
}
