import { Version3Models } from 'jira.js';
import { Project } from './project';
import { ProjectModel } from './models/projectModel';
import { Context } from '../../context';
import { userContextWrapper } from '../user';

export async function convertApiResponseToProject(apiResponse: Version3Models.Project, context: Context): Promise<Project> {
  const { User } = userContextWrapper(context);

  const lead = await User.get(apiResponse.lead.accountId);

  const projectModel: ProjectModel = {
    id: apiResponse.id,
    key: apiResponse.key,
    name: apiResponse.name,
    lead,
  };

  return new Project(projectModel, context);
}
