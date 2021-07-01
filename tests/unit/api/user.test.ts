import { use } from '../../../src';
import { configMock } from '../../configMock';

describe('User', () => {
  describe('Facade', () => {
    const { User } = use(configMock);

    it('should contain get', () => {
      expect(User.get).toBeDefined();
    });

    it('should contain getCurrent', () => {
      expect(User.getCurrent).toBeDefined();
    });
  });
});