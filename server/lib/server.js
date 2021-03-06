const { Server } = require('http');
const express = require('express');
const Store = require('./store');
const logger = require('./logger');
const routes = require('./routes');

class QuestionnaireServer extends Server {
  constructor(redisClient) {
    const app = express();
    const store = new Store(redisClient);

    app.use(express.static(`${__dirname}/../.dist`));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api', routes(store));

    /*
     * Error handling middleware
     */
    app.use((err, req, res, next) => {
      // No status means it's an unspecified, internal error
      if (!err.status) {
        // Error elements are not enumerable
        // We create an anonymous object to be able to log the details
        logger.error({
          message: err.message,
          stack: err.stack,
        });
        res.message = {
          status: 500,
          payload: {
            reason: 'Internal Error',
          },
        };
      } else {
        res.message = {
          status: err.status || 500,
          payload: {
            reason: err.message,
          },
        };
      }
      next();
    });

    /*
     * Finalize payload and send response to user
     */
    app.use((req, res) => {
      if (!res.message) {
        res.status(404).json({
          reason: 'Resource not found',
        });
      } else {
        const { status, payload } = res.message;
        res.status(status).json(payload);
      }
    });

    super(app);
  }
}

module.exports = QuestionnaireServer;
