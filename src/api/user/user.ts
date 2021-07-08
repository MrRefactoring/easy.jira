import { ClientType, createClient } from 'jira.js';
import { UserDto } from './dto/userDto';
import { UserModel } from './models/userModel';
import { Context } from '../../context';
import { getUser } from './static';

export class User extends UserDto {
  readonly #apiV3;
  readonly #context;

  constructor(model: UserModel, context: Context) {
    super(model);

    this.#context = context;
    this.#apiV3 = createClient(ClientType.Version3, context.config);
  }

  async sync() {
    const user = await getUser(this.id, this.#context);

    this.setData(user);
  }

  async delete(): Promise<void> {
    await this.#apiV3.users.removeUser({ accountId: this.id });

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
