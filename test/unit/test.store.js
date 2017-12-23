process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const redis = require('redis-mock');
const Store = require('../../lib/store');

const client = redis.createClient();
const store = new Store(client);

describe('store', () => {
  describe('constructor', () => {
    it('should require a redis client', () => {
      try {
        // Given
        // When
        // Then
      } catch (error) {
        done(error);
      }
    });
  });

  describe('getSession', () => {
    it('should get a session', async (done) => {
      try {
        // Given
        // When
        // Then
      } catch (error) {
        done(error);
      }
    });

    it('should return error if no session found', async (done) => {
      try {
        // Given
        // When
        // Then
      } catch (error) {
        done(error);
      }
    });

    it('should return an error if no key provided', async (done) => {
      try {
        // Given
        // When
        // Then
      } catch (error) {
        done(error);
      }
    });
  });

  describe('saveSession', () => {
    it('should save a session', async (done) => {
      try {
        // Given
        // When
        // Then
      } catch (error) {
        done(error);
      }
    });

    it('should error if trying to save invalid session', async (done) => {
      try {
        // Given
        // When
        // Then
      } catch (error) {
        done(error);
      }
    });

    it('should error if no key is provided', async (done) => {
      try {
        // Given
        // When
        // Then
      } catch (error) {
        done(error);
      }
    });
  });

  describe('getSessionKeys', () => {
    it('should get a list of keys', async (done) => {
      try {
        // Given
        // When
        // Then
      } catch (error) {
        done(error);
      }
    });
  });

  describe('getQuestion', () => {
    it('should get a question', async (done) => {
      try {
        // Given
        // When
        // Then
      } catch (error) {
        done(error);
      }
    });

    it('should return an error if no question found', async (done) => {
      try {
        // Given
        // When
        // Then
      } catch (error) {
        done(error);
      }
    });

    it('should return an error if no key provided', async (done) => {
      try {
        // Given
        // When
        // Then
      } catch (error) {
        done(error);
      }
    });
  });

  describe('saveQuestion', () => {
    it('should save a question', async (done) => {
      try {
        // Given
        // When
        // Then
      } catch (error) {
        done(error);
      }
    });

    it('should error if trying to save an invalid question', async (done) => {
      try {
        // Given
        // When
        // Then
      } catch (error) {
        done(error);
      }
    });

    it('should error if no key is provided', (done) => {
      try {
        // Given
        // When
        // Then
      } catch (error) {
        done(error);
      }
    });
  });

  describe('getQuestionKeys', () => {
    it('should get a list of keys', async (done) => {
      try {
        // Given
        // When
        // Then
      } catch (error) {
        done(error);
      }
    });
  });
});
