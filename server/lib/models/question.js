const uuid = require('uuid/v4');

const uuidTest = /([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}){1}/i;

/**
 * Question
 */
class Question {
  /**
   * Create a question
   * @param {Object}    values
   * @param {String}    values.question
   * @param {String[]}  values.answers
   */
  constructor(values) {
    if (!values) {
      throw new Error('instantiation values required');
    }

    if (!values.id) {
      this.id = uuid();
    } else if (typeof values.id !== 'string' || !uuidTest.test(values.id)) {
      throw new Error('must have a valid ID');
    } else {
      this.id = values.id;
    }

    if (!values.question || typeof values.question !== 'string') {
      throw new Error('question must be a string');
    }

    if (!values.answers || !Array.isArray(values.answers) || values.answers.length < 2) {
      throw new Error('answers must be an array with at least two elements');
    } else if (values.answers.reduce((acc, el) => typeof el !== 'string', false)) {
      throw new Error('answers must be an array of strings');
    } else if (values.answers.length < 2) {
      throw new Error('answers must have more than two elements');
    }

    this.question = values.question;
    this.answers = values.answers;
  }

  /**
   * Generate the redis key for this resource
   */
  getRedisKey() {
    return `question:${this.id}`;
  }

  /**
   * Generate the redis hash for this resource to HMSET
   */
  getRedisHash() {
    return {
      id: this.id,
      question: this.question,
      answers: JSON.stringify(this.answers),
    };
  }
}

module.exports = Question;
