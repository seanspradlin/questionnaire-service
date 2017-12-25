const { Router } = require('express');
const session = require('./session');
const start = require('./start');
const next = require('./next');
const summary = require('./summary');

module.exports = (store) => {
  const router = new Router();

  router.use('/session', session(store));
  router.use('/start', start(store));
  router.use('/next', next(store));
  router.use('/summary', summary(store));

  return router;
};
