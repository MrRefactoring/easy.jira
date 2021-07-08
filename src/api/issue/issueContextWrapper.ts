import { Context } from '../../context';
import { createIssue, getIssue, IssueCreationData } from './static';

export function issueContextWrapper(context: Context) {
  const get = async (issueIdOrKey: string) => getIssue(issueIdOrKey, context);
  const create = async (creationData: IssueCreationData) => createIssue(creationData, context);

  return {
    Issue: {
      get,
      create,
    },
  };
}
