const bunyan = require('bunyan');

let logger;

if (process.env.NODE_ENV !== 'test') {
  logger = bunyan.createLogger({ name: 'questionnaire-service' });
} else {
  logger = bunyan.createLogger({
    name: 'questionnaire-service',
    streams: [
      {
        path: `${__dirname}/../../.debug`,
      },
    ],
  });
}

module.exports = logger;
