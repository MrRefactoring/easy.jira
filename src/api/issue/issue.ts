import { ClientType, createClient, Version3Client } from 'jira.js';
import { IssueDto } from './dto/issueDto';
import { Context } from '../../context';
import { IssueModel } from './models/issueModel';
import { getIssue } from './static';
import { getUser } from '../user/static';
import { User } from '../user';
import { IssueMapper } from './issueMapper';
import { getCache } from '../../cache';

export class Issue extends IssueDto {
  readonly #apiV3: Version3Client;
  readonly #context: Context;

  constructor(model: IssueModel, context: Context) {
    super(model);

    this.#apiV3 = createClient(ClientType.Version3, context.config);
    this.#context = context;
  }

  async sync(): Promise<void> {
    getCache(this.#context).delete(`Issue_${this.id}`);

    const issue = await getIssue(this.id, this.#context);

    this.setData(issue);
  }

  async update(): Promise<void> {
    const apiIssue = await IssueMapper.issueModelToApi(this);

    await this.#apiV3.issues.editIssue({
      issueIdOrKey: this.id,
      fields: apiIssue.fields,
    });

    return this.sync();
  }

  async delete(): Promise<void> {
    await this.#apiV3.issues.deleteIssue({ issueIdOrKey: this.id });

    this.removeData();
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
