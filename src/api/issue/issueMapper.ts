import { Version3Models } from 'jira.js';
import { IssueModel } from './models/issueModel';
import { userContextWrapper } from '../user';
import { Context } from '../../context';
import { UserMapper } from '../user/userMapper';
import { getCache } from '../../cache';
import { Constants } from '../../constants';

export namespace IssueMapper {
  export const apiToIssueModel = async (api: Version3Models.IssueBean, context: Context): Promise<IssueModel> => {
    const { accountId: assigneeAccountId } = api.fields.assignee;

    const { User } = userContextWrapper(context);

    const assignee = assigneeAccountId ? await User.get(assigneeAccountId) : null;
    const creator = await User.get(api.fields.creator.accountId);
    const reporter = await User.get(api.fields.reporter.accountId);

    const cache = getCache(context);

    const issueFieldNames = cache.get<Record<string, string>>(Constants.CacheKeys.IssueFieldNames)!;

    const storyPointFieldName = Object.entries(issueFieldNames).find(([, value]) => value === 'Story point estimate')?.[0];

    const storyPointEstimate = api.fields[storyPointFieldName!] ?? null;

    return {
      id: api.id,
      key: api.key,
      title: api.fields.summary,
      created: new Date(api.fields.created),
      updated: new Date(api.fields.updated),
      dueDate: api.fields.duedate ? new Date(api.fields.duedate) : null,
      labels: api.fields.labels,
      assignee,
      creator,
      reporter,
      storyPointEstimate,
    };
  };

  export const issueModelToApi = async (model: IssueModel): Promise<Version3Models.IssueBean> => ({
    id: model.id,
    key: model.key,
    fields: {
      summary: model.title,
      labels: model.labels,
      created: model.created.toISOString(),
      updated: model.updated.toISOString(),
      duedate: model.dueDate?.toISOString(),
      assignee: {
        accountId: model.assignee?.id,
      },
      creator: await UserMapper.userModelToApi(model.creator),
      reporter: await UserMapper.userModelToApi(model.reporter),
      // @ts-ignore
      status: undefined,
      // @ts-ignore
      priority: undefined,
      // @ts-ignore
      timetracking: undefined,
    },
  });
}
