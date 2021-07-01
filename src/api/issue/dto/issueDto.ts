import { User } from '../../user';
import { IssueModel } from '../models/issueModel';
import { BaseDTO } from '../../../DTOs';

export class IssueDto extends BaseDTO<IssueModel> implements IssueModel {
  id!: string;
  key!: string;

  assignee?: User;

  constructor(model: IssueModel) {
    super();

    this.setData(model);
  }
}
