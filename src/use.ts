import { Config } from 'jira.js';
import { issueContextWrapper, projectContextWrapper, userContextWrapper } from './api';

export function use(config: Config) {
  const context = { config };

  const { Issue } = issueContextWrapper(context);
  const { Project } = projectContextWrapper(context);
  const { User } = userContextWrapper(context);

  return {
    Issue,
    Project,
    User,
  };
}
