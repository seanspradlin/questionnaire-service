const Server = require('./lib/server');
const logger = require('./lib/logger');
const redis = require('redis');

const REDIS = process.env.REDIS || '//localhost:6379';
const PORT = process.env.PORT || 8080;

const client = redis.createClient(REDIS);
const server = new Server(client);

server.listen(PORT, () => {
  logger.info(`Server running on ${PORT}`);
});
