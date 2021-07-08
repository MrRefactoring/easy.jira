import { ClientType, createClient } from 'jira.js';
import { Issue } from '../issue';
import { Context } from '../../../context';
import { IssueMapper } from '../issueMapper';

export async function getIssue(issueIdOrKey: string, context: Context): Promise<Issue> {
  const apiV3 = createClient(ClientType.Version3, context.config);

  const apiIssueModel = await apiV3.issues.getIssue({ issueIdOrKey });
  const issueModel = await IssueMapper.apiToIssueModel(apiIssueModel, context);

  return new Issue(issueModel, context);
}
