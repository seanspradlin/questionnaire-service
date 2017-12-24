const Server = require('./lib/server');
const logger = require('./lib/logger');
const redis = require('redis');

const client = redis.createClient();
const server = new Server(client);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  logger.info(`Server running on ${PORT}`);
});
