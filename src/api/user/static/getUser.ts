import { ClientType, createClient } from 'jira.js';
import { Context } from '../../../context';
import { User } from '../user';
import { UserMapper } from '../userMapper';
import { getCache } from '../../../cache';

export async function getUser(userId: string, context: Context): Promise<User> {
  const cacheKey = `User_${userId}`;
  const cache = getCache(context);

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  const apiV3 = createClient(ClientType.Version3, context.config);

  const apiUserModel = await apiV3.users.getUser({ accountId: userId, expand: 'groups,applicationRoles' }); // TODO expand: ['groups', 'applicationRoles'] });
  const userModel = UserMapper.apiToUserModel(apiUserModel);

  const user = new User(userModel, context);

  cache.set(cacheKey, user);

  return user;
}
