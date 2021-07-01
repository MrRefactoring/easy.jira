import { Issue } from './issue';
import { Context } from '../../context';

export async function createIssue(context: Context): Promise<Issue> {
  return new Issue({
    id: '',
    key: '',
  }, context);
}
