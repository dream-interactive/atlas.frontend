import {Observable} from 'rxjs';

export interface CrudService<T, ID> {
  create: (t: T) => Observable<T>;
  update: (t: T) => Observable<T>;
  delete: (id: ID) => void;
  findById: (id: ID) => Observable<T>;
  findAll: () => Observable<T[]>;
}
