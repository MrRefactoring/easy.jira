import { ClientType, createClient, Version3Models } from 'jira.js';
import { Project } from './project';
import { Context } from '../../context';
import { ProjectModel } from '../../models';
import { userContextWrapper } from '../user';

export async function getProject(projectId: string | number, context: Context): Promise<Project> {
  const apiV3 = createClient(ClientType.Version3, context.config);
  const { User } = userContextWrapper(context);

  // @ts-ignore TODO jira.js fix
  const rawProject: Version3Models.Project = await apiV3.projects.getProject({
    // @ts-ignore todo jira.js fix
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

  const lead = await User.get(rawProject.lead.accountId!); // todo jira.js fix

  const projectModel: ProjectModel = {
    id: rawProject.id!, // TODO jira.js fix
    key: rawProject.key!, // TODO jira.js fix
    name: rawProject.name!, // TODO jira.js fix
    lead,
  };

  return new Project(projectModel, context);
}
