import { use } from '../../src';

const {
  Issue,
  User,
} = use({ host: '' });

describe('Issue', () => {
  it('should return issue', async () => {

  });

  it('sync method should fetch new data', async () => {
    const user = await User.get('');
    const issue = await Issue.get('');

    expect(issue.assignee).toBeUndefined();

    await issue.sync();

    expect(issue.assignee).toEqual(user);
  });
});
