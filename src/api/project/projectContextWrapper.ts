import { Context } from '../../context';
import {
  getAllProjects,
  getProject,
  getProjectsPaginated as getProjectsPaginatedWithContext,
  restoreProject,
} from './static';

export function projectContextWrapper(context: Context) {
  const getAll = async () => getAllProjects(context);
  const getProjectsPaginated = async () => getProjectsPaginatedWithContext(context);
  const get = async (projectIdOrKey: string) => getProject(projectIdOrKey, context);
  const restore = async (projectIdOrKey: string) => restoreProject(projectIdOrKey, context);

  return {
    Project: {
      get,
      getAll,
      getProjectsPaginated,
      restore,
    },
  };
}
