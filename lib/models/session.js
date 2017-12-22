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
    if (!values) {
      throw new Error('instantiation values required');
    }
    if (!values.id || typeof values.id !== 'string') {
      throw new Error('must have a valid ID');
    }
    if (!values.questionsAsked || !Array.isArray(values.questionsAsked)) {
      throw new Error('questionsAsked must be an array');
    }

    this.id = values.id;
    this.questionsAsked = values.questionsAsked;
  }
}

module.exports = Session;
