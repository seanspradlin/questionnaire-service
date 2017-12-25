const redis = require('redis');
const seed = require('./seed');
const logger = require('./lib/logger');

const REDIS = process.env.REDIS || '//localhost:6379';

const client = redis.createClient(REDIS);
seed(client)
  .then(() => {
    logger.info('Seed complete');
    process.exit();
  })
  .catch((error) => {
    logger.error(error);
  });

