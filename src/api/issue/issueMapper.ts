import { Version3Models } from 'jira.js';
import { IssueModel } from './models/issueModel';
import { userContextWrapper } from '../user';
import { Context } from '../../context';

export namespace IssueMapper {
  export const apiToIssueModel = async (api: Version3Models.IssueBean, context: Context): Promise<IssueModel> => {
    const { accountId: assigneeAccountId } = api.fields.assignee;

    const { User } = userContextWrapper(context);
    const assignee = assigneeAccountId ? await User.get(assigneeAccountId) : null;

    return {
      id: api.id,
      key: api.key,
      title: api.fields.summary,
      labels: api.fields.labels,
      assignee,
    };
  };

  export const issueModelToApi = async () => {};
}
