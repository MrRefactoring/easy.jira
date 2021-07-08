import { ClientType, createClient } from 'jira.js';
import { Context } from '../../../context';
import { User } from '../user';
import { UserMapper } from '../userMapper';

export async function getUser(userId: string, context: Context): Promise<User> {
  const apiV3 = createClient(ClientType.Version3, context.config);

  const apiUserModel = await apiV3.users.getUser({ accountId: userId, expand: 'groups,applicationRoles' }); // expand: ['groups', 'applicationRoles'] });
  const userModel = UserMapper.apiToUserModel(apiUserModel);

  return new User(userModel, context);
}
