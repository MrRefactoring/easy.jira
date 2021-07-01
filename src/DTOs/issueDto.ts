import { User } from '../api';
import { IssueModel } from '../models';
import { SetData } from './setData';

export class IssueDto extends SetData<IssueDto> implements IssueModel {
  id!: string;
  key!: string;

  assignee?: User;

  constructor(model: IssueModel) {
    super();

    this.setData(model);
  }
}
