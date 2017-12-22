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
    if (!values.question || typeof values.question !== 'string') {
      throw new Error('question must be a string');
    }
    if (!values.answers || !Array.isArray(values.answers) || values.answers.length < 2) {
      throw new Error('answers must be an array with at least two elements');
    }

    this.question = values.question;
    this.answers = values.answers;
  }
}

module.exports = Question;
