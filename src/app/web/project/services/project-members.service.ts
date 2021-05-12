import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ProjectMember, TasksContainer} from '../../../shared/atlas/entity.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectMembersService {

  private readonly uri = environment.uri;

  constructor(private http: HttpClient) { }

  findAllMembersByProjectId(idp: string): Observable<ProjectMember[]> {
    return this.http.get<ProjectMember[]>(`${this.uri}/projects/${idp}/members`);
  }
}
