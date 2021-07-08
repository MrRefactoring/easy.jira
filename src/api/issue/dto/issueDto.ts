import { User } from '../../user';
import { IssueModel } from '../models/issueModel';
import { BaseDTO } from '../../../DTOs';

export class IssueDto extends BaseDTO<IssueModel> implements IssueModel {
  id: string = '';
  key: string = '';
  title: string = '';
  labels: string[] = [];

  assignee: User | null = null;

  constructor(model: IssueModel) {
    super();

    this.setData(model);
  }

  protected setData(data: Partial<IssueModel>) {
    super.setData(data, this);
  }
}
