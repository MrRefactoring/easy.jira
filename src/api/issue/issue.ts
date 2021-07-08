import { ClientType, createClient, Version3Client } from 'jira.js';
import { IssueDto } from './dto/issueDto';
import { Context } from '../../context';
import { IssueModel } from './models/issueModel';
import { getIssue } from './static';
import { getUser } from '../user/static';
import { User } from '../user';

export class Issue extends IssueDto {
  readonly #apiV3: Version3Client;
  readonly #context: Context;

  constructor(model: IssueModel, context: Context) {
    super(model);

    this.#context = context;
    this.#apiV3 = createClient(ClientType.Version3, context.config);
  }

  async sync(): Promise<void> {
    const issue = await getIssue(this.id, this.#context);

    this.setData(issue);
  }

  async update(): Promise<void> {
    return this.#apiV3.issues.editIssue({
      issueIdOrKey: this.id,
      fields: {
        summary: this.title,
        labels: this.labels,
      },
    });
  }

  async delete(): Promise<void> {
    await this.#apiV3.issues.deleteIssue({ issueIdOrKey: this.id });

    this.setData({
      id: undefined,
      key: undefined,
      assignee: undefined,
      title: undefined,
      labels: [],
    });
  }

  // async addAttachment() {
  // }
  //
  // async addComment() {
  // }

  async assign(user?: string | User) {
    const userId = (typeof user === 'string' ? user : user?.id) ?? null;

    await this.#apiV3.issues.assignIssue({
      issueIdOrKey: this.id,
      accountId: userId,
    });

    this.assignee = await (userId ? getUser(userId, this.#context) : null);
  }

  async setTitle(title: string): Promise<void> {
    this.title = title;
    return this.update();
  }

  async addLabel(label: string): Promise<void> {
    return this.addLabels([label]);
  }

  async addLabels(labels: string[]): Promise<void> {
    this.labels.push(...labels);
    return this.update()
      .catch((error) => {
        this.labels = this.labels.slice(0, this.labels.length - labels.length);

        throw error;
      });
  }

  async addVote(): Promise<void> {
    await this.#apiV3.issueVotes.addVote({ issueIdOrKey: this.id });

    return this.sync();
  }

  async revokeVote(): Promise<void> {
    await this.#apiV3.issueVotes.removeVote({ issueIdOrKey: this.id });

    return this.sync();
  }
}
