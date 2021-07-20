import {
  use,
  Issue as IssueType,
  Project as ProjectType,
} from '../../../src';
import { config } from '../config';
import { Constants } from '../constants';

describe('Issue e2e', () => {
  const {
    Issue,
    Project,
    User,
  } = use(config);

  let project: ProjectType;
  let createdIssue: IssueType;

  beforeAll(async () => {
    const myself = await User.getMyself();

    project = await Project.create({
      key: Constants.projectKey,
      name: Constants.projectName,
      lead: myself,
    });
  });

  afterAll(async () => {
    await project.delete();
  });

  it('should create issue', async () => {
    createdIssue = await Issue.create({
      project,
      title: Constants.issueTitle,
      type: Constants.issueTaskType,
    });

    expect(createdIssue).toBeDefined();
    expect(createdIssue.id).toBeDefined();
    expect(createdIssue.key).toBeDefined();
    expect(createdIssue.title).toBe(Constants.issueTitle);
    expect(createdIssue.labels).toEqual([]);
    // expect(createdIssue.assignee).toBe(null);
  });

  it('should get issue', async () => {
    const issue = await Issue.get(createdIssue.id);

    expect(issue).toBeDefined();
    expect(issue.id).toBeDefined();
    expect(issue.key).toBeDefined();
    expect(issue.title).toBe(Constants.issueTitle);
    expect(issue.labels).toEqual([]);
    // expect(issue.assignee).toBe(null);
  });

  it('should delete issue', async () => {
    const issueId = createdIssue.id;

    await createdIssue.delete();

    expect(createdIssue).toBeDefined();
    expect(createdIssue.id).toBeUndefined();
    expect(createdIssue.key).toBeUndefined();
    expect(createdIssue.title).toBeUndefined();
    expect(createdIssue.labels).toBeUndefined();
    expect(createdIssue.assignee).toBeUndefined();

    Issue.get(issueId)
      .then(() => {
        expect(true).toBe(false);
      })
      .catch(() => {
        expect(true).toBe(true);
      });
  });
});
