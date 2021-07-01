import { Context } from '../../../context';
import { User } from '../user';

export async function getUser(userId: string, context: Context): Promise<User> {
  return new User({ active: false, id: '' }, context);
}
