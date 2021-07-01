import { ProjectModel } from '../models';
import { User } from '../api';
import { SetData } from './setData';

export class ProjectDto extends SetData<ProjectDto> implements ProjectModel {
  id!: string;
  key!: string;
  name!: string;

  lead!: User;

  constructor(model: ProjectModel) {
    super();

    this.setData(model);
  }
}
