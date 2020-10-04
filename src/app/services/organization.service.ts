import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CrudService} from './crud.service';
import {Project} from './project.service';
import {HttpClient} from '@angular/common/http';

export interface Organization {
  id?: string;
  name: string;
  image?: string;
  owner: string; // ID user which create organization
  members?: string[]; // ID all users who is member of this organization
  projects?: Project; // TODO project
}

const URL = 'http://localhost:9000'
@Injectable({
  providedIn: 'root'
})

export class OrganizationService  implements CrudService<Organization, string>{

  // organization: Organization;

  constructor(private http: HttpClient) {
  }

  save(organization: Organization): Observable<Organization>{
  //  return this.http.post<Organization>(`${URL}/api/organization/`, organization);
    return null;

  }

  delete( id: string): void{
  }
  findByUserId(userId: string): Observable<Organization> {
    console.log('Saving organization.....')
    //  return  this.http.get<Organization>(`${URL}/api/organization/${userId}`)
    return null;
  }
  findAll(): Observable<Organization[]>{
    return null;
  }
  findById(id: string): Observable<Organization> {
    //  return  this.http.get<Organization>(`${URL}/api/organization/${id}`)
    return null;
  }

}
