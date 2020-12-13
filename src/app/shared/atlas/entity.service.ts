import { Injectable } from '@angular/core';

export interface AtlasException {
  aeid: number; // atlas exception id
  key: string; // ATLAS, JDK, SQL
  section: string; // project, organization, ticket etc
  messageInLog: string;
  messageInThrow: string;
  title: string;
  description: string; // description for programmer
}

@Injectable({
  providedIn: 'root'
})
export class EntityService {}
