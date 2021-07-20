import { ProjectModel } from '../models/projectModel';
import { User } from '../../user';
import { BaseDTO } from '../../../DTOs';

export class ProjectDto extends BaseDTO<ProjectModel> implements ProjectModel {
  id: string = '';
  key: string = '';
  name: string = '';
  lead: User = undefined as unknown as User;

  constructor(model: ProjectModel) {
    super();

    this.setData(model);
  }
}
