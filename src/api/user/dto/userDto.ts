import { UserModel } from '../models/userModel';
import { BaseDTO } from '../../../DTOs';

export class UserDto extends BaseDTO<UserModel> implements UserModel {
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
