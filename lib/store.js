const Promise = require('bluebird');
const { Question, Session } = require('./models');

/**
 * Store
 */
class Store {
  /**
   * Create an instance of the store
   * @param {Redis} redis
   */
  constructor(redis) {
    this.client = Promise.promisifyAll(redis);
  }
  /**
   * Get a session
   * @param  {String} id
   * @returns {Promise<Session>} Session data
   */
  getSession(id) {
    if (!id) {
      return Promise.reject(new Error('id is required'));
    }
    const redisKey = `session:${id}`;
    return this.client.hgetallAsync(redisKey).then((data) => {
      if (!data) {
        return Promise.resolve(null);
      }

      const session = new Session(data);
      return Promise.resolve(session);
    });
  }

  /**
   * Save a session
   * @param  {Session}  session
   * @returns {Promise<void>} Confirmation of save operation
   */
  saveSession(session) {
    if (!(session instanceof Session)) {
      return Promise.reject(new Error('session must be of type Session'));
    }
    return Promise.all([
      this.client.saddAsync('sessionKeys', session.id),
      this.client.hmsetAsync(session.getRedisKey(), session),
    ]).then(() => Promise.resolve());
  }

  /**
   * Get a list of all session keys
   * @returns {Promise<String[]>} Session key list
   */
  getSessionKeys() {
    return this.client.smembersAsync('sessionKeys');
  }

  /**
   * Get a question
   * @param {String} id
   * @returns {Promise<Question>} Question data
   */
  getQuestion(id) {
    if (!id) {
      return Promise.reject(new Error('id is required'));
    }
    const redisKey = `question:${id}`;
    return this.client.hgetallAsync(redisKey).then((data) => {
      if (!data) {
        return Promise.resolve(null);
      }

      const answers = JSON.parse(data.answers);
      const question = new Question({ id: data.id, question: data.question, answers });
      return Promise.resolve(question);
    });
  }

  /**
   * Save a question
   * @param {String}    key
   * @param {Question}  question
   * @returns {Promise<void>} Confirmation of save operation
   */
  saveQuestion(question) {
    if (!(question instanceof Question)) {
      return Promise.reject(new Error('question must be of type Question'));
    }
    return Promise.all([
      this.client.saddAsync('questionKeys', question.id),
      this.client.hmsetAsync(question.getRedisKey(), question),
    ]).then(() => Promise.resolve());
  }

  /**
   * Get a list of all question keys
   * @returns {Promise<String[]>} Question key list
   */
  getQuestionKeys() {
    return this.client.smembersAsync('questionKeys');
  }
}

module.exports = Store;
