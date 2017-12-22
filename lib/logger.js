const bunyan = require('bunyan');

const logger = bunyan.createLogger({ name: 'questionnaire-service' });

module.exports = logger;

