const { Router } = require('express');
const session = require('./session');
const start = require('./start');
const next = require('./next');
const summary = require('./summary');

const router = new Router();

router.use('/session', session);
router.use('/start', start);
router.use('/next', next);
router.use('/summary', summary);

module.exports = router;

