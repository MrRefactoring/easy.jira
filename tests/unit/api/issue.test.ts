import { use } from '../../../src';
import { configMock } from '../../configMock';

describe('Issue', () => {
  describe('Facade', () => {
    const { Issue } = use(configMock);

    it('should contain get', () => {
      expect(Issue.get).toBeDefined();
    });

    it('should contain create', () => {
      expect(Issue.create).toBeDefined();
    });
  });

  // TODO
  // it('should return issue', async () => {
  //
  // });
  //
  // it('sync method should fetch new data', async () => {
  //   const user = await User.get('');
  //   const issue = await Issue.get('');
  //
  //   expect(issue.assignee).toBeUndefined();
  //
  //   await issue.sync();
  //
  //   expect(issue.assignee).toEqual(user);
  // });
});
