import { Version3Models } from 'jira.js';
import { User } from './user';
import { Context } from '../../context';
import { UserModel } from '../../models';

export async function convertApiResponseToUser(apiResponse: Version3Models.User, context: Context): Promise<User> {
  const userModel: UserModel = {
    id: apiResponse.accountId!, // TODO jira.js fix
    active: apiResponse.active!, // TODO jira.js fix
  };

  return new User(userModel, context);
}
