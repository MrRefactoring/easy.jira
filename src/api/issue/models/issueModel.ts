import { User } from '../../user';

export interface IssueModel {
  id: string;
  key: string;

  assignee?: User;
}
