process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const redis = require('redis-mock');
const uuid = require('uuid/v4');
const Store = require('../../lib/store');
const { Question, Session } = require('../../lib/models');
const Promise = require('bluebird');

describe('store', () => {
  describe('constructor', () => {
    it('should require a redis client', () => {
      // When
      const instantiate = () => new Store();

      // Then
      assert.throws(instantiate);
    });
  });

  describe('getSession', () => {
    it('should get a session', async (done) => {
      try {
        // Given
        const client = redis.createClient();
        const store = new Store(client);
        const session = new Session();
        const hmset = Promise.promisify(client.hmset);
        await hmset(session.getRedisKey(), session);

        // When
        const retrieved = await store.getSession(session.id);

        // Then
        assert.equal(retrieved.id, session.id);
        assert.instanceOf(retrieved, Session);
        done();
      } catch (error) {
        done(error);
      }
    });

    it('should return null if no session found', async (done) => {
      try {
        // Given
        const client = redis.createClient();
        const store = new Store(client);
        const id = uuid();

        // When
        const retrieved = await store.getSession(id);

        // Then
        assert.isNull(retrieved);
        done();
      } catch (error) {
        done(error);
      }
    });

    it('should return an error if no key provided', async (done) => {
      try {
        // Given
        const client = redis.createClient();
        const store = new Store(client);

        // When
        await store.getSession();

        // Then
        assert.fail();
        done(new Error('should have errored'));
      } catch (error) {
        done();
      }
    });
  });

  describe('saveSession', () => {
    it('should save a session', async (done) => {
      try {
        // Given
        const client = redis.createClient();
        const store = new Store(client);
        const session = new Session();

        // When
        await store.saveSession(session);

        // Then
        const hgetall = Promise.promisify(client.hgetall);
        const hash = await hgetall(session.getRedisKey());
        assert.equal(hash.id, session.id);
        done();
      } catch (error) {
        done(error);
      }
    });

    it('should error if trying to save invalid session', async (done) => {
      try {
        // Given
        const client = redis.createClient();
        const store = new Store(client);
        const session = { invalid: 'not a session' };

        // When
        await store.saveSession(session);

        // Then
        assert.fail();
        done(new Error('Error should have been caught'));
      } catch (error) {
        done();
      }
    });

    it('should create an entry in the session keys list', async (done) => {
      try {
        // Given
        const client = redis.createClient();
        const store = new Store(client);
        const session = new Session();
        const scard = Promise.promisify(client.scard);

        // When
        await store.saveSession(session);

        // Then
        const len = await scard('sessionList');
        assert.equal(len, 1);
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('getSessionKeys', () => {
    it('should get a list of keys', async (done) => {
      try {
        // Given
        const client = redis.createClient();
        const store = new Store(client);
        const sadd = Promise.promisify(client.sadd);
        const id = uuid();
        await sadd('sessionKeys', id);

        // When
        const keys = await store.getSessionKeys();

        // Then
        assert.isArray(keys);
        assert.equal(keys.length, 1);
        assert.isString(keys[0]);
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('getQuestion', () => {
    it('should get a question', async (done) => {
      try {
        // Given
        const client = redis.createClient();
        const store = new Store(client);
        const question = new Question({
          question: 'What is the best Toto song?',
          answers: ['Africa', 'Hold the Line'],
        });
        const hmset = Promise.promisify(client.hmset);
        await hmset(question.getRedisKey(), question);

        // When
        const retrieved = await store.getQuestion(question.id);

        // Then
        assert.equal(retrieved.id, question.id);
        assert.instanceOf(retrieved, Question);
      } catch (error) {
        done(error);
      }
    });

    it('should return null if no question found', async (done) => {
      try {
        // Given
        const client = redis.createClient();
        const store = new Store(client);
        const id = uuid();

        // When
        const retrieved = await store.getQuestion(id);

        // Then
        assert.isNull(retrieved);
        done();
      } catch (error) {
        done(error);
      }
    });

    it('should return an error if no key provided', async (done) => {
      try {
        // Given
        const client = redis.createClient();
        const store = new Store(client);

        // When
        await store.getQuestion();

        // Then
        assert.fail();
        done(new Error('should have errored'));
      } catch (error) {
        done();
      }
    });
  });

  describe('saveQuestion', () => {
    it('should save a question', async (done) => {
      try {
        // Given
        const client = redis.createClient();
        const store = new Store(client);
        const question = new Question({
          question: 'What is the best Toto song?',
          answers: ['Africa', 'Hold the Line'],
        });

        // When
        await store.saveQuestion(question);

        // Then
        const hgetall = Promise.promisify(client.hgetall);
        const hash = await hgetall(question.getRedisKey());
        assert.equal(hash.id, question.id);
        done();
      } catch (error) {
        done(error);
      }
    });

    it('should error if trying to save an invalid question', async (done) => {
      try {
        // Given
        const client = redis.createClient();
        const store = new Store(client);
        const question = { invalid: 'not a question' };

        // When
        await store.saveQuestion(question);

        // Then
        assert.fail();
        done(new Error('Error should have been caught'));
      } catch (error) {
        done();
      }
    });

    it('should create an entry in the question keys list', async (done) => {
      try {
        // Given
        const client = redis.createClient();
        const store = new Store(client);
        const question = new Question({
          question: 'What is the best Toto song?',
          answers: ['Africa', 'Hold the Line'],
        });
        const scard = Promise.promisify(client.scard);

        // When
        await store.saveQuestion(question);

        // Then
        const len = await scard('questionList');
        assert.equal(len, 1);
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  describe('getQuestionKeys', () => {
    it('should get a list of keys', async (done) => {
      try {
        // Given
        const client = redis.createClient();
        const store = new Store(client);
        const sadd = Promise.promisify(client.sadd);
        const id = uuid();
        await sadd('questionKeys', id);

        // When
        const keys = await store.getQuestionKeys();

        // Then
        assert.isArray(keys);
        assert.equal(keys.length, 1);
        assert.isString(keys[0]);
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
