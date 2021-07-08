import { User } from '../../user';

export interface IssueModel {
  id: string;
  key: string;
  title: string;
  labels: string[];

  assignee: User | null;
}
