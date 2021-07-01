import { ClientType, createClient } from 'jira.js';
import { ProjectDto } from '../../DTOs';
import { ProjectModel } from '../../models';
import { Context } from '../../context';
import { getProject } from './getProject';

export class Project extends ProjectDto {
  private apiV3;

  constructor(model: ProjectModel, private context: Context) {
    super(model);

    this.apiV3 = createClient(ClientType.Version3, context.config);
  }

  async sync(): Promise<void> {
    const project = await getProject(this.id, this.context);

    this.setData(project);
  }

  async update() {}

  async delete(enableUndo: boolean = false) {
    await this.apiV3.projects.deleteProject({ projectIdOrKey: this.id, enableUndo });

    this.setData({
      id: undefined,
      key: undefined,
      name: undefined,
      lead: undefined,
    });
  }

  async archive(): Promise<void> {
    await this.apiV3.projects.archiveProject({ projectIdOrKey: this.id });
    return this.sync();
  }

  async setAvatar() {}

  async deleteAvatar() {}
}
