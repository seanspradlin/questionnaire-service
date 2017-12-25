const redis = require('redis');
const Server = require('./lib/server');
const logger = require('./lib/logger');
const seed = require('./seed');

const REDIS = process.env.REDIS || '//localhost:6379';
const PORT = process.env.PORT || 8080;

const client = redis.createClient(REDIS);
const server = new Server(client);

client.dbsize(async (error, size) => {
  if (!size) {
    await seed(client);
  }
  server.listen(PORT, () => {
    logger.info(`Server running on ${PORT}`);
  });
});

