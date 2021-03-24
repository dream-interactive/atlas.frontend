import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AtlasException} from '../../../shared/atlas/entity.service';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {

  private URL = environment.uri;

  constructor(private http: HttpClient) { }

  findAllExceptions(): Observable<AtlasException[]> {
    return this.http.get<AtlasException[]>(`${this.URL}/exceptions`);
  }
}
