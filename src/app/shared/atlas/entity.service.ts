import {Injectable} from '@angular/core';
import {Data} from '@angular/router';

export type AtlasException = {
  aeid: number; // atlas exception id
  key: string; // ATLAS, JDK, SQL
  section: string; // project, organization, ticket etc
  messageInLog: string;
  messageInThrow: string;
  title: string;
  description: string; // description for programmer
};

export type Task = {
  idt?: number;
  idtc: number; // TasksContainer Id
  indexNumber: number; // used for saving order place
  summary: string;
  idp: string;
  keyNumber: number;

  assignToId?: string | null; // assign to user
  creatorId: string;
  checkerId?: string;
  priority: string;
  description: string;
  points: number;
  closeBeforeTasks: number[]; // ids
  closeAfterTasks: number[]; // ids
  closeWithTasks: number[]; // ids
  labels: string[];
  dateTimeS: Date;
  dateTimeE?: Date;
  dateTimeU?: Date;
};

export type TasksContainer = {
  idtc?: number;
  name: string;
  idp: string;
  canBeDeleted: boolean;
  tasks: Task[];
  // used for saving order place
  indexNumber: number;
};

export const TaskPriorities: string [] = [
  'Low',
  'Medium',
  'High'
];


export type Organization = {
  id?: string;
  name: string;
  validName: string;
  img?: string;
  ownerUserId: string; // ID user which create organization
};

export type AtlasUserAuth = { // Okta User Profile
  email: string;
  emailVerified: boolean;
  familyName: string;
  givenName: string;
  name: string;
  sub: string;
  local: string;
};

export type AtlasUser = AtlasUserAuth & {
  lastModify: Data;
  userPicture: string;
};

export type Project = {
  idp?: string;
  name: string;
  key: string;
  organizationId: string;
  type: number;
  leadId: string;
  img?: string;
  isPrivate?: boolean;
  labels?: string [];
};

export type ProjectMember = {
  idp: string;
  role: string;
  user: AtlasUser;
};

@Injectable({
  providedIn: 'root'
})
export class EntityService {
}
