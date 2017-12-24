const { Router } = require('express');

module.exports = (store) => {
  const router = new Router();

  /**
   * @api {post} /next Get next question
   * @apiName PostNext
   * @apiVersion 1.0.0
   * @apiGroup Questionnaire
   * @apiDescription
   * Get the next question in the series of questions. A series must be started by calling the start
   * endpoint first.
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
   *   "question": "How much do you exercise a week?",
   *   "answers": [
   *     "Never",
   *     "Less than an hour",
   *     "Between one and five hours",
   *     "Between five and ten hours",
   *     "More than ten hours"
   *   ]
   * }
   *
   * @apiUse BadRequestError
   * @apiUse UnprocessableEntityError
   */
  router.post('/', (req, res, next) => {
    next(new Error('not implemented'));
  });

  return router;
};
