import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {AtlasUser, ProjectMember, TasksContainer} from '../../../shared/atlas/entity.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectMembersService {

  private readonly uri = environment.uri;
  private membersSub = new BehaviorSubject<ProjectMember[]>([]);
  public members$ = this.membersSub.asObservable();

  constructor(private http: HttpClient) { }

  findAllMembersByProjectId(idp: string): Observable<ProjectMember[]> {
    return this.http.get<ProjectMember[]>(`${this.uri}/projects/${idp}/members`)
      .pipe(
        tap((ms) => this.membersSub.next(ms))
      );
  }

  updateMembers(ms: ProjectMember[]): void {
    this.membersSub.next(ms);
  }
}
