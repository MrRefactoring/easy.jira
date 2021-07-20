import { ClientType, createClient } from 'jira.js';
import { Issue } from '../issue';
import { Context } from '../../../context';
import { IssueMapper } from '../issueMapper';
import { getCache } from '../../../cache';
import { Constants } from '../../../constants';

export async function getIssue(issueIdOrKey: string, context: Context): Promise<Issue> {
  const cacheKey = `Issue_${issueIdOrKey}`;
  const cache = getCache(context);

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  const apiV3 = createClient(ClientType.Version3, context.config);

  const apiIssueModel = await apiV3.issues.getIssue({
    issueIdOrKey,
    expand: cache.has(Constants.CacheKeys.IssueFieldNames) ? undefined : 'names', // TODO ['names']
  });

  cache.set(Constants.CacheKeys.IssueFieldNames, apiIssueModel.names);

  const issueModel = await IssueMapper.apiToIssueModel(apiIssueModel, context);
  const issue = new Issue(issueModel, context);

  cache.set(cacheKey, issue);

  return issue;
}
