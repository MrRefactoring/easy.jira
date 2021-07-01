import { User } from '../api/user';

export interface IssueModel {
  id: string;
  key: string;

  assignee?: User;
}
