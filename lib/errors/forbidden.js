/**
 * ForbiddenError
 */
class ForbiddenError extends Error {
  /**
   * Creates an instance of ForbiddenError, which is used when there is a sequencing problem
   */
  constructor() {
    super('Request is forbidden. Did you forget to forget to start the questionnaire?');
    this.status = 403;
  }
}

module.exports = ForbiddenError;
