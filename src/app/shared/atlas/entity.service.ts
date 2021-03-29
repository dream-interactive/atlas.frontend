import {Injectable} from '@angular/core';
import {Data} from '@angular/router';

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
  idp: string;
  keyNumber: number;

  assignToId?: number; // assign to user
  creatorId: string;
  checkerId?: string;
  priority: number;
  status: number;
  description: {};
  points: number;
  closeBeforeIssues: number[]; // ids
  closeAfterIssues: number[]; // ids
  closeWithIssues: number[]; // ids
  labels: string[];
  dateTimeS: Date;
  dateTimeE: Date;
  dateTimeU: Date;
}

export interface IssuesContainer {
  idic?: number;
  name: string;
  idp: string;
  canBeDeleted: boolean;
  issues: Issue[];
  // used for saving order place
  indexNumber: number;
}

export const IssuePriorities: string [] = [
  'Low',
  'Medium',
  'High'
];


export interface Organization {
  id?: string;
  name: string;
  validName: string;
  img?: string;
  ownerUserId: string; // ID user which create organization
}

export interface AtlasUserAuth { // Okta User Profile
  email: string;
  emailVerified: boolean;
  familyName: string;
  givenName: string;
  name: string;
  sub: string;
  local: string;
}

export interface AtlasUser extends AtlasUserAuth {
  lastModify: Data;
  userPicture: string;
}

export interface Project {
  idp?: string;
  name: string;
  key: string;
  organizationId: string;
  type: ProjectType;
  leadId: string;
  img?: string;
  isPrivate?: boolean;
}

export enum ProjectType {
  SCRUM, KANBAN
}

@Injectable({
  providedIn: 'root'
})
export class EntityService {
}
