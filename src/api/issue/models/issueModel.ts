import { User } from '../../user';

export interface IssueModel {
  id: string;
  key: string;
  title: string;
  created: Date;
  updated: Date;
  dueDate: Date | null;
  labels: string[];
  assignee: User | null;
  creator: User;
  reporter: User;
  storyPointEstimate: number | null;
}
