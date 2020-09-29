import { Injectable } from '@angular/core';

export interface Organization {
  id?: string;
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor() { }
}
