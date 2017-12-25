const { assert } = require('chai');
const utils = require('../../lib/utils');
const uuid = require('uuid/v4');

describe('utils', () => {
  describe('getRandomElement', () => {
    it('should get a random element from an array', () => {
      const arr = [1, 2, 3];
      const el = utils.getRandomElement(arr);
      assert.include(arr, el);
    });
  });

  describe('UUID_TEST', () => {
    it('should pass a valid uuid', () => {
      const id = uuid();
      assert.isTrue(utils.UUID_TEST.test(id));
    });

    it('should fail an invalid uuid', () => {
      assert.isFalse(utils.UUID_TEST.test('not a uuid'));
    });
  });
});
