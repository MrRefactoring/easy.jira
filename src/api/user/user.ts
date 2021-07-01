import { ClientType, createClient } from 'jira.js';
import { UserDto } from '../../DTOs';
import { UserModel } from '../../models';
import { Context } from '../../context';
import { getUser } from './getUser';

export class User extends UserDto {
  private apiV3;

  constructor(model: UserModel, private context: Context) {
    super(model);

    this.apiV3 = createClient(ClientType.Version3, context.config);
  }

  async sync() {
    const user = await getUser(this.id, this.context);

    this.setData(user);
  }

  async delete(): Promise<void> {
    await this.apiV3.users.removeUser({ accountId: this.id });

    this.setData({
      id: undefined,
      active: undefined,
      displayName: undefined,
      email: undefined,
      locale: undefined,
      timeZone: undefined,
    });
  }
}
