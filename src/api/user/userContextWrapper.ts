import { Context } from '../../context';
import { getCurrentUser, getUser } from './static';

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
