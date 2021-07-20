import { ClientType, createClient, Version3Parameters } from 'jira.js';
import { Context } from '../../../context';
import { User } from '../user';
import { UserMapper } from '../userMapper';
import { getCache } from '../../../cache';

export async function getMyselfUser(context: Context): Promise<User> {
  const apiV3 = createClient(ClientType.Version3, context.config);

  const apiUserModel = await apiV3.myself.getCurrentUser({
    expand: [
      Version3Parameters.GetCurrentUser.Expand.Groups,
      Version3Parameters.GetCurrentUser.Expand.ApplicationRoles,
    ],
  });

  const userModel = UserMapper.apiToUserModel(apiUserModel);

  const cache = getCache(context);
  const user = new User(userModel, context);

  cache.set(`User_${user.id}`, user);

  return user;
}
