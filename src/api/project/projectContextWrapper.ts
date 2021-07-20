import { Context } from '../../context';
import {
  createProject,
  getAllProjects,
  getProject,
  // getProjectsPaginated as getProjectsPaginatedWithContext,
  ProjectInformation,
  restoreProject,
} from './static';

export function projectContextWrapper(context: Context) {
  const create = async (creationData: ProjectInformation) => createProject(creationData, context);
  const getAll = async () => getAllProjects(context);
  // const getProjectsPaginated = async () => getProjectsPaginatedWithContext(context);
  const get = async (projectIdOrKey: string) => getProject(projectIdOrKey, context);
  const restore = async (projectIdOrKey: string) => restoreProject(projectIdOrKey, context);

  return {
    Project: {
      create,
      get,
      getAll,
      // getProjectsPaginated,
      restore,
    },
  };
}
