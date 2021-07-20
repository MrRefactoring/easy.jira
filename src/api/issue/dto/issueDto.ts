import { User } from '../../user';
import { IssueModel } from '../models/issueModel';
import { BaseDTO } from '../../../DTOs';

export class IssueDto extends BaseDTO<IssueModel> implements IssueModel {
  id: string = '';
  key: string = '';
  title: string = '';
  created: Date = new Date();
  updated: Date = new Date();
  dueDate: Date | null = null;
  labels: string[] = [];
  assignee: User | null = null;
  // @ts-ignore
  creator: User = null;
  // @ts-ignore
  reporter: User = null;
  storyPointEstimate = null;

  constructor(model: IssueModel) {
    super();

    this.setData(model);
  }
}
