const BadRequestError = require('./bad-request');
const ForbiddenError = require('./forbidden');
const NotFoundError = require('./not-found');
const UnprocessableEntityError = require('./unprocessable-entity');

module.exports = {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnprocessableEntityError,
};
