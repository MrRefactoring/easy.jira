import { ClientType, createClient } from 'jira.js';
import { Context } from '../../../context';
import { User } from '../user';
import { UserMapper } from '../userMapper';

export async function getMyselfUser(context: Context): Promise<User> {
  const apiV3 = createClient(ClientType.Version3, context.config);

  const apiUserModel = await apiV3.myself.getCurrentUser({ expand: ['groups', 'applicationRoles'] }); // TODO
  const userModel = UserMapper.apiToUserModel(apiUserModel);

  return new User(userModel, context);
}
