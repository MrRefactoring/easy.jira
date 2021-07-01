import { ClientType, createClient } from 'jira.js';
import { Context } from '../../../context';
import { Project } from '../project';
import { convertApiResponseToProject } from '../convertApiResponseToProject';

export async function getAllProjects(context: Context): Promise<Project[]> {
  const apiV3 = createClient(ClientType.Version3, context.config);

  return apiV3.projects.getAllProjects()
    .then((rawProjects) => Promise.all(rawProjects.map((rawProject) => convertApiResponseToProject(rawProject, context))));
}
