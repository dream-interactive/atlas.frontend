import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CrudService} from './crud.service';
import {Project} from './project.service';
import {HttpClient} from '@angular/common/http';
import {ProfileService, UserProfile} from './profile.service';

export interface Organization {
  id?: string;
  name: string;
  validName: string;
  image?: string;
  owner: string; // ID user which create organization
  members?: string[]; // ID all users who is member of this organization
  projects?: Project; // TODO project
}

const URL = 'http://localhost:9000';
@Injectable({
  providedIn: 'root'
})

export class OrganizationService  implements CrudService<Organization, string>{

  // organization: Organization;
  public profile: UserProfile;

  constructor(private http: HttpClient,
              private profileService: ProfileService) {
    if (this.profileService.profile$) {
      this.profileService.profile$.subscribe(prof => this.profile = prof);
    }
  }

  save(organization: Organization): Observable<Organization>{
    console.log('Saving organization.....', organization);
    //  return this.http.post<Organization>(`${URL}/api/organization/`, organization);
    return null;
  }

  delete( id: string): void{
  }

  findAllByUserId(userId: string): Observable<Organization[]> {
    console.log('Finding organization.....', userId);
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
  existByName(name: string): Observable<boolean>{
    console.log('exist', name);
    // return this.http.get<boolean>(`${URL}/api/organization/name/${name}`);
    return new Observable<boolean>(obs => { obs.next(false); });
  }

}


