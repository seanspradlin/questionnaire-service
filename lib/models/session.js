const uuid = require('uuid/v4');

const uuidTest = /([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}){1}/i;

/**
 * Session
 */
class Session {
  /**
   * Creates an instance of a session
   * @param {Object}    values
   * @param {UUID}      values.id
   * @param {String[]}  values.questionsAsked
   */
  constructor(values) {
    if (!values || !values.id) {
      this.id = uuid();
    } else if (typeof values.id !== 'string' || !uuidTest.test(values.id)) {
      throw new Error('must have a valid ID');
    } else {
      this.id = values.id;
    }
    if (!values || !values.questionsAsked) {
      this.questionsAsked = [];
    } else if (!Array.isArray(values.questionsAsked)) {
      throw new Error('questionsAsked must be an array');
    } else {
      this.questionsAsked = values.questionsAsked;
    }
  }

  getRedisKey() {
    return `session:${this.id}`;
  }
}

module.exports = Session;
