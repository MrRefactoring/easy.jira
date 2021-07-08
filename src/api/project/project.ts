import { ClientType, createClient } from 'jira.js';
import { ProjectDto } from './dto/projectDto';
import { ProjectModel } from './models/projectModel';
import { Context } from '../../context';
import { getProject } from './static';
import { IssueCreationData } from '../issue/static';
import { issueContextWrapper } from '../issue';

export class Project extends ProjectDto {
  readonly #apiV3;
  readonly #context;

  constructor(model: ProjectModel, context: Context) {
    super(model);

    this.#context = context;
    this.#apiV3 = createClient(ClientType.Version3, context.config);
  }

  async sync(): Promise<void> {
    const project = await getProject(this.id, this.#context);

    this.setData(project);
  }

  async update(): Promise<void> {
    await this.#apiV3.projects.updateProject({
      projectIdOrKey: this.id,
      name: this.name,
      leadAccountId: this.lead.id,
      key: this.key,
    });

    return this.sync();
  }

  async delete(enableUndo: boolean = false) {
    await this.#apiV3.projects.deleteProject({ projectIdOrKey: this.id, enableUndo });

    this.setData({
      id: undefined,
      key: undefined,
      name: undefined,
      lead: undefined,
    });
  }

  async archive(): Promise<void> {
    await this.#apiV3.projects.archiveProject({ projectIdOrKey: this.id });
    return this.sync();
  }

  async createIssue(creationData: IssueCreationData & { project: never; }): Promise<void> {
    const { Issue } = issueContextWrapper(this.#context);

    await Issue.create({ ...creationData, project: this });
  }

  // async setAvatar() {}

  // async deleteAvatar() {}
}
