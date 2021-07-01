import { UserModel } from '../models';
import { SetData } from './setData';

export class UserDto extends SetData<UserDto> implements UserModel {
  id!: string;
  active!: boolean;
  displayName?: string;
  email?: string;
  locale?: string;
  timeZone?: string;

  constructor(model: UserModel) {
    super();

    this.setData(model);
  }
}
