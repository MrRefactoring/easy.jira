import { use } from '../../../src';
import { configMock } from '../../configMock';

describe('Project', () => {
  describe('Facade', () => {
    const { Project } = use(configMock);

    it('should contain get', () => {
      expect(Project.get).toBeDefined();
    });

    it('should contain getProjectsPaginated', () => {
      expect(Project.getProjectsPaginated).toBeDefined();
    });

    it('should contain getAll', () => {
      expect(Project.getAll).toBeDefined();
    });

    it('should contain restore', () => {
      expect(Project.restore).toBeDefined();
    });
  });
});
