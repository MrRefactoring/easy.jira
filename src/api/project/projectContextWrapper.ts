import { Context } from '../../context';
import { getAllProjects } from './getAllProjects';
import { getProjectsPaginated as getProjectsPaginatedWithContext } from './getProjectsPaginated';
import { getProject } from './getProject';
import { restoreProject } from './restoreProject';

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
