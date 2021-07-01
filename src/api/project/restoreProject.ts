import { ClientType, createClient } from 'jira.js';
import { Context } from '../../context';
import { Project } from './project';
import { convertApiResponseToProject } from './convertApiResponseToProject';

export async function restoreProject(projectIdOrKey: string, context: Context): Promise<Project> {
  const apiV3 = createClient(ClientType.Version3, context.config);

  await apiV3.projects.restore({ projectIdOrKey });

  const rawProject = await apiV3.projects.getProject({ projectIdOrKey });

  return convertApiResponseToProject(rawProject, context);
}
