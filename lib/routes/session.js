const { Router } = require('express');

const router = new Router();

/**
 * @api {post} /session Create a new session
 * @apiName PostSession
 * @apiVersion 1.0.0
 * @apiGroup Session
 * @apiDescription
 * This is a helper method that generates a random UUID.
 *
 * @apiSuccess {UUID} session Session ID
 *
 * @apiSuccessExample
 * HTTP/1.1 200 OK
 * {
 *   "session": "66c77d16-babb-49a6-8e89-f90cd4cef285"
 * }
 */
router.post('/', (req, res, next) => {
  next(new Error('not implemented'));
});

module.exports = router;

