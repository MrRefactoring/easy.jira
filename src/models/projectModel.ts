import { User } from '../api';

export interface ProjectModel {
  id: string;
  key: string;
  name: string;

  lead: User;
}
