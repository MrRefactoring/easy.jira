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
});
