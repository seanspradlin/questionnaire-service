/**
 * Store
 */
class Store {
  /**
   * Create an instance of the store
   * @param {Redis} redis
   */
  constructor(redis) {}
  /**
   * Get a session
   * @param  {String} key
   * @returns {Promise<Session>} Session data
   */
  async getSession(key) {}

  /**
   * Save a session
   * @param  {String}   key
   * @param  {Session}  session
   * @returns {Promise<void>} Confirmation of save operation
   */
  async saveSession(key, session) {}

  /**
   * Get a list of all session keys
   * @returns {Promise<String[]>} Session key list
   */
  async getSessionKeys() {}

  /**
   * Get a question
   * @param {String} key
   * @returns {Promise<Question>} Question data
   */
  async getQuestion(key) {}

  /**
   * Save a question
   * @param {String}    key
   * @param {Question}  question
   * @returns {Promise<void>} Confirmation of save operation
   */
  async saveQuestion(key, question) {}

  /**
   * Get a list of all question keys
   * @returns {Promise<String[]>} Question key list
   */
  async getQuestionKeys() {}
}

module.exports = Store;
