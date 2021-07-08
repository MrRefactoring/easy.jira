import { ClientType, createClient, Version3Models } from 'jira.js';
import { Project } from '../project';
import { Context } from '../../../context';
import { ProjectMapper } from '../projectMapper';

export async function getProject(projectId: string | number, context: Context): Promise<Project> {
  const apiV3 = createClient(ClientType.Version3, context.config);

  const apiProjectModel: Version3Models.Project = await apiV3.projects.getProject({
    projectIdOrKey: projectId,
    expand: [
      Version3Models.Project.Expand.Description,
      Version3Models.Project.Expand.IssueTypes,
      Version3Models.Project.Expand.Lead,
      Version3Models.Project.Expand.ProjectKeys,
      Version3Models.Project.Expand.IssueTypeHierarchy,
      Version3Models.Project.Expand.Description,
    ],
  });

  const projectModel = await ProjectMapper.apiToProjectModel(apiProjectModel, context);

  return new Project(projectModel, context);
}
