/**
 * BadRequestError
 */
class BadRequestError extends Error {
  /**
   * Creates an instance of BadRequestError, which indicates that the request is missing parameters
   */
  constructor() {
    super('Missing parameters');
    this.status = 400;
  }
}

module.exports = BadRequestError;
