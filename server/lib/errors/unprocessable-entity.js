/**
 * UnprocessableEntityError
 */
class UnprocessableEntityError extends Error {
  /**
   * Creates an instance of UnprocessableEntityError, which is used when invalid parameters are
   * presented
   */
  constructor() {
    super('Parameters could not be parsed.');
    this.status = 422;
  }
}

module.exports = UnprocessableEntityError;
