import { ClientType, createClient } from 'jira.js';
import { Context } from '../../../context';
import { User } from '../user';
import { convertApiResponseToUser } from '../convertApiResponseToUser';

export async function getCurrentUser(context: Context): Promise<User> {
  const apiV3 = createClient(ClientType.Version3, context.config);

  // @ts-ignore todo jira.js fix
  const user = await apiV3.myself.getCurrentUser({ expand: ['groups', 'applicationRoles'] });

  // @ts-ignore todo jira.js fix
  return convertApiResponseToUser(user, context);
}
