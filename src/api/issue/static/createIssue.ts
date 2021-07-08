import { ClientType, createClient } from 'jira.js';
import { Issue } from '../issue';
import { Context } from '../../../context';
import { Project } from '../../project';
import { getIssue } from './getIssue';

export interface IssueCreationData {
  title: string;
  project: Project;
  type: string; // IssueType;
}

export async function createIssue(creationData: IssueCreationData, context: Context): Promise<Issue> {
  const apiV3 = createClient(ClientType.Version3, context.config);

  const { id } = await apiV3.issues.createIssue({
    fields: {
      summary: creationData.title,
      project: {
        key: creationData.project.key,
      },
      issuetype: {
        name: creationData.type,
      },
    },
  });

  return getIssue(id, context);
}
