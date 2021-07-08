import { Version3Models } from 'jira.js';
import { UserModel } from './models/userModel';
import { User } from './user';

export namespace UserMapper {
  export const apiToUserModel = (api: Version3Models.User): UserModel => ({
    id: api.accountId,
    active: api.active,
    email: api.emailAddress,
    displayName: api.displayName,
    timeZone: api.timeZone,
    locale: api.locale,
  });

  export const userModelToApi = (user: User): Version3Models.User => ({
    accountId: user.id,
    active: user.active,
    emailAddress: user.email,
    displayName: user.displayName,
    timeZone: user.timeZone,
    locale: user.locale,
  });
}
