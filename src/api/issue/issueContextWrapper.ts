import { Context } from '../../context';
import { getIssue } from './getIssue';
import { createIssue } from './createIssue';

export function issueContextWrapper(context: Context) {
  const get = async (issueIdOrKey: string) => getIssue(issueIdOrKey, context);
  const create = async () => createIssue(context);

  return {
    Issue: {
      get,
      create,
    },
  };
}
