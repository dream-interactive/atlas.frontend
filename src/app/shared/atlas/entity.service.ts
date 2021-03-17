import {Injectable} from '@angular/core';

export interface AtlasException {
  aeid: number; // atlas exception id
  key: string; // ATLAS, JDK, SQL
  section: string; // project, organization, ticket etc
  messageInLog: string;
  messageInThrow: string;
  title: string;
  description: string; // description for programmer
}
export interface Issue {
  idi?: number;
  idic: number; // IssuesContainer Id
  indexNumber: number; // used for saving order place
  name: string;
  assignToId?: number; // assign to user
  creatorId: string;
  checkerId?: string;
  priorityId: number;
  closeBeforeIssues: Issue[];
  closeAfterIssues: Issue[];
  closeWithIssues: Issue[];
  labels: string[];
  dateTimeS: Date;
  dateTimeE: Date;
  dateTimeU: Date;
}

export interface IssuesContainer {
  idic?: number;
  name: string;
  idp: string;
  // used for saving order place
  indexNumber: number;
}

export const IssuePriority: Map<number, string> = new Map()
  .set(1, 'Low')
  .set(2, 'Medium')
  .set(1, 'High');

@Injectable({
  providedIn: 'root'
})
export class EntityService {}
