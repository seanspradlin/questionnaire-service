const uuid = require('uuid/v4');
const utils = require('../utils');

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
    } else if (typeof values.id !== 'string' || !utils.UUID_TEST.test(values.id)) {
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

  /**
   * Generate the redis key for this resource
   */
  getRedisKey() {
    return `session:${this.id}`;
  }

  /**
   * Generate the redis hash for this resource to HMSET
   */
  getRedisHash() {
    return {
      id: this.id,
      questionsAsked: JSON.stringify(this.questionsAsked),
    };
  }
}

module.exports = Session;
