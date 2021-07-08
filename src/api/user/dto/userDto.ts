import { UserModel } from '../models/userModel';
import { BaseDTO } from '../../../DTOs';

export class UserDto extends BaseDTO<UserModel> implements UserModel {
  id: string = '';
  active: boolean = false;
  displayName?: string = undefined;
  email?: string = undefined;
  locale?: string = undefined;
  timeZone?: string = undefined;

  constructor(model: UserModel) {
    super();

    this.setData(model);
  }

  protected setData(data: Partial<UserModel>) {
    super.setData(data, this);
  }
}
