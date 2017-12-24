const { Router } = require('express');

module.exports = (store) => {
  const router = new Router();

  /**
   * @api {post} /start Start a questionnaire
   * @apiName PostStart
   * @apiVersion 1.0.0
   * @apiGroup Questionnaire
   * @apiDescription
   * Start a questionnaire by providing a session ID
   *
   * @apiParam {UUID} session Session ID
   * @apiParamExample {json} Request Example
   * {
   *   "session": "66c77d16-babb-49a6-8e89-f90cd4cef285"
   * }
   *
   * @apiSuccess {String}   question      Question to be asked
   * @apiSuccess {String[]} answers       Collection of answers
   *
   * @apiSuccessExample
   * HTTP/1.1 200 OK
   * {
   *   "question": "What should we have for lunch?",
   *   "answers": [
   *     "Hamburgers",
   *     "Pizza",
   *     "Tacos",
   *     "Sushi"
   *   ]
   * }
   *
   * @apiUse BadRequestError
   * @apiUse UnprocessableEntityError
   * @apiUse ForbiddenError
   */
  router.post('/', (req, res, next) => {
    next(new Error('not implemented'));
  });

  return router;
};
