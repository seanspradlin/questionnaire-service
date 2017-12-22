const server = require('./lib/server');
const logger = require('./lib/logger');

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  logger.info(`Server running on ${PORT}`);
});

