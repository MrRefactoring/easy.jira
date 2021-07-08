import { Version3Models } from 'jira.js';
import { ProjectModel } from './models/projectModel';
import { Context } from '../../context';
import { userContextWrapper } from '../user';

export namespace ProjectMapper {
  export const apiToProjectModel = async (api: Version3Models.Project, context: Context): Promise<ProjectModel> => {
    const { User } = userContextWrapper(context);

    const lead = await User.get(api.lead.accountId);

    return {
      id: api.id,
      key: api.key,
      name: api.name,
      lead,
    };
  };

  export const projectModelToApi = () => {};
}
