process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const redis = require('redis-mock');
const uuid = require('uuid/v4');
const Store = require('../../lib/store');
const { Question, Session } = require('../../lib/models');
const Promise = require('bluebird');

const client = Promise.promisifyAll(redis.createClient());
const store = new Store(client);

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
    it('should get a session', async () => {
      // Given
      const session = new Session();
      await client.hmsetAsync(session.getRedisKey(), session);

      // When
      const retrieved = await store.getSession(session.id);

      // Then
      assert.equal(retrieved.id, session.id);
      assert.instanceOf(retrieved, Session);
    });

    it('should return null if no session found', async () => {
      // Given
      const id = uuid();

      // When
      const retrieved = await store.getSession(id);

      // Then
      assert.isNull(retrieved);
    });

    it('should return an error if no key provided', (done) => {
      // When
      store
        .getSession()
        .then(() => {
          done(new Error('should have thrown'));
        })
        .catch(() => {
          done();
        });
    });
  });

  describe('saveSession', () => {
    it('should save a session', async () => {
      // Given
      const session = new Session();

      // When
      await store.saveSession(session);

      // Then
      const hash = await client.hgetallAsync(session.getRedisKey());
      assert.equal(hash.id, session.id);
    });

    it('should error if trying to save invalid session', (done) => {
      // Given
      const session = { invalid: 'not a session' };

      // When
      store
        .saveSession(session)
        .then(() => {
          done(new Error('should have thrown error'));
        })
        .catch(() => done());
    });

    it('should create an entry in the session keys list', async () => {
      // Given
      const session = new Session();

      // When
      await store.saveSession(session);

      // Then
      const members = await client.smembersAsync('sessionKeys');
      assert.include(members, session.id);
    });
  });

  describe('getSessionKeys', () => {
    it('should get a list of keys', async () => {
      // Given
      const id = uuid();
      await client.saddAsync('sessionKeys', id);

      // When
      const keys = await store.getSessionKeys();

      // Then
      assert.isArray(keys);
      assert.include(keys, id);
      assert.isString(keys[0]);
    });
  });

  describe('getQuestion', () => {
    it('should get a question', async () => {
      // Given
      const id = uuid();
      const question = 'What is the best Toto song?';
      const answers = JSON.stringify(['Africa', 'Hold the Line']);
      await client.hmsetAsync(`question:${id}`, { id, question, answers });

      // When
      const retrieved = await store.getQuestion(id);

      // Then
      assert.equal(retrieved.id, id);
      assert.instanceOf(retrieved, Question);
    });

    it('should return null if no question found', async () => {
      // Given
      const id = uuid();

      // When
      const retrieved = await store.getQuestion(id);

      // Then
      assert.isNull(retrieved);
    });

    it('should return an error if no key provided', (done) => {
      // When
      store
        .getQuestion()
        .then(() => done(new Error('should have thrown error')))
        .catch(() => done());
    });
  });

  describe('saveQuestion', () => {
    it('should save a question', async () => {
      // Given
      const question = new Question({
        question: 'What is the best Toto song?',
        answers: ['Africa', 'Hold the Line'],
      });

      // When
      await store.saveQuestion(question);

      // Then
      const hash = await client.hgetallAsync(question.getRedisKey());
      assert.equal(hash.id, question.id);
    });

    it('should error if trying to save an invalid question', (done) => {
      // Given
      const question = { invalid: 'not a question' };

      // When
      store
        .saveQuestion(question)
        .then(() => done(new Error('must have thrown error')))
        .catch(() => done());
    });

    it('should create an entry in the question keys list', async () => {
      // Given
      const question = new Question({
        question: 'What is the best Toto song?',
        answers: ['Africa', 'Hold the Line'],
      });

      // When
      await store.saveQuestion(question);

      // Then
      const members = await client.smembersAsync('questionKeys');
      assert.include(members, question.id);
    });
  });

  describe('getQuestionKeys', () => {
    it('should get a list of keys', async () => {
      // Given
      const id = uuid();
      await client.saddAsync('questionKeys', id);

      // When
      const keys = await store.getQuestionKeys();

      // Then
      assert.isArray(keys);
      assert.isString(keys[0]);
    });
  });

  describe('getRandomQuestion', () => {
    it('should get a random question', async () => {
      // Given
      const question = new Question({
        question: 'What is the best Toto song?',
        answers: ['Africa', 'Hold the Line'],
      });
      await store.saveQuestion(question);

      // When
      const q = await store.getRandomQuestion();

      // Then
      assert.instanceOf(q, Question);
    });
  });
});
