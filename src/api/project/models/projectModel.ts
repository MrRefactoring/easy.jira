import { User } from '../../index';

export interface ProjectModel {
  id: string;
  key: string;
  name: string;

  lead: User;
}
