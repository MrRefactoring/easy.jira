import { Context } from '../../context';
import { getMyselfUser, getUser } from './static';

export function userContextWrapper(context: Context) {
  const get = async (userId: string) => getUser(userId, context);
  const getMyself = async () => getMyselfUser(context);

  return {
    User: {
      get,
      getMyself,
    },
  };
}
