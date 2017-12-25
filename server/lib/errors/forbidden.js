/**
 * ForbiddenError
 */
class ForbiddenError extends Error {
  /**
   * Creates an instance of ForbiddenError, which is used when there is a sequencing problem
   */
  constructor() {
    super('Request is forbidden.');
    this.status = 403;
  }
}

module.exports = ForbiddenError;
