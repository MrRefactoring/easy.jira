import { BaseDTO } from '../../../src/DTOs';

describe('BaseDTO', () => {
  it('should set data to class', () => {
    class Test extends BaseDTO<any> {
      id: string | undefined = undefined;
    }

    const test = new Test();

    expect(test.id).toBeUndefined();

    // @ts-ignore
    test.setData({ id: 'ID', notExistedProp: '1' });

    expect(test.id).toBe('ID');
    // @ts-ignore
    expect(test.notExistedProp).toBeUndefined();
  });
});
