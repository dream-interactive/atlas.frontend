import {Observable} from 'rxjs';

export interface CrudService<T, ID> {
  save: (t: T) => Observable<T>;
  delete: (id: ID) => void;
  findById: (id: ID) => Observable<T>;
  findAll: () => Observable<T[]>;
}
