import { Context } from '../../context';
import { getUser } from './getUser';
import { getCurrentUser } from './getCurrentUser';

export function userContextWrapper(context: Context) {
  const get = async (userId: string) => getUser(userId, context);
  const getCurrent = async () => getCurrentUser(context);

  return {
    User: {
      get,
      getCurrent,
    },
  };
}
