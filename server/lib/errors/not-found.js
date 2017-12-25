/**
 * NotFoundError
 */
class NotFoundError extends Error {
  /**
   * Creates an instance of NotFoundError for when a resource doesn't exist
   */
  constructor() {
    super('Resource not found');
    this.status = 404;
  }
}

module.exports = NotFoundError;
