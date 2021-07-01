import { ClientType, createClient } from 'jira.js';
import { Issue } from '../issue';
import { Context } from '../../../context';
import { userContextWrapper } from '../../user';

export async function getIssue(issueIdOrKey: string, context: Context): Promise<Issue> {
  const apiV3 = createClient(ClientType.Version3, context.config);
  const { User } = userContextWrapper(context);

  const originalIssue = await apiV3.issues.getIssue({ issueIdOrKey });

  const { accountId: assigneeAccountId } = originalIssue.fields.assignee;

  const assignee = await (assigneeAccountId ? User.get(assigneeAccountId) : undefined);

  return new Issue({
    // @ts-ignore
    id: originalIssue.id, // TODO jira.js mark as defined
    // @ts-ignore
    key: originalIssue.key, // TODO jira.js mark as defined
    assignee,
  }, context);
}
