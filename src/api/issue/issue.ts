import { ClientType, createClient, Version3Client } from 'jira.js';
import { IssueDto } from './dto/issueDto';
import { Context } from '../../context';
import { IssueModel } from './models/issueModel';
import { getIssue } from './static';
import { getUser } from '../user/static';
import { User } from '../user';

export class Issue extends IssueDto {
  private apiV3: Version3Client;

  constructor(model: IssueModel, private context: Context) {
    super(model);

    this.apiV3 = createClient(ClientType.Version3, context.config);
  }

  async sync(): Promise<void> {
    const issue = await getIssue(this.id, this.context);

    this.setData(issue);
  }

  // async update() {
  // }

  async delete(): Promise<void> {
    await this.apiV3.issues.deleteIssue({ issueIdOrKey: this.id });

    this.setData({
      id: undefined,
      key: undefined,
      assignee: undefined,
    });
  }

  // async addAttachment() {
  // }
  //
  // async addComment() {
  // }

  async assign(user?: string | User) {
    const userId = (typeof user === 'string' ? user : user?.id) ?? null;

    await this.apiV3.issues.assignIssue({
      issueIdOrKey: this.id,
      // @ts-ignore
      accountId: userId, // TODO change type in jira.js for remove ts-ignore
    });

    this.assignee = await (userId ? getUser(userId, this.context) : undefined);
  }
}
