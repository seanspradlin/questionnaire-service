process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const uuid = require('uuid/v4');
const { Session } = require('../../lib/models');

describe('session', () => {
  it('should be a function', () => {
    assert.isFunction(Session);
  });

  it('should have an id', () => {
    // Given
    const values = {
      id: uuid(),
      questionsAsked: [uuid(), uuid()],
    };

    // When
    const session = new Session(values);

    // Then
    assert.isString(session.id);
  });

  it('should have questionsAsked', () => {
    // Given
    const values = {
      id: uuid(),
      questionsAsked: [{ id: uuid(), answer: 0 }, { id: uuid(), answer: null }],
    };

    // When
    const session = new Session(values);

    // Then
    assert.isArray(session.questionsAsked);
  });

  it('should throw error if id is invalid', () => {
    // Given
    const values = {
      id: 'invalid-token',
      questionsAsked: [uuid(), uuid()],
    };

    // When
    const instantiate = () => new Session(values);

    // Then
    assert.throws(instantiate);
  });

  it('should generate an id if no id is provided', () => {
    // Given
    const values = {
      questionsAsked: [uuid(), uuid()],
    };

    // When
    const session = new Session(values);

    // Then
    assert.isString(session.id);
    assert.isOk(session.id);
  });

  it('should make empty array if no questionsAsked provided', () => {
    // When
    const session = new Session();

    // Then
    assert.isArray(session.questionsAsked);
    assert.equal(session.questionsAsked.length, 0);
  });

  it('should throw an error if questionsAsked is not an array', () => {
    // Given
    const values = {
      id: uuid(),
      questionsAsked: 'invalid',
    };

    // When
    const instantiate = () => new Session(values);

    // Then
    assert.throws(instantiate);
  });

  describe('getRedisKey', () => {
    it('should give a proper redis key', () => {
      // Given
      const id = uuid();
      const session = new Session({ id });

      // When
      const redisKey = session.getRedisKey();

      // Then
      assert.equal(redisKey, `session:${id}`);
    });
  });
});
