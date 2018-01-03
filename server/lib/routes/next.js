const { Router } = require('express');
const { ForbiddenError, BadRequestError, UnprocessableEntityError } = require('../errors');
const utils = require('../utils');

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
   * @apiParam {UUID}   session   Session ID
   * @apiParam {Number} answer  Answer to previous question
   * @apiParamExample {json} Request Example
   * {
   *   "session": "66c77d16-babb-49a6-8e89-f90cd4cef285",
   *   "answer": 0
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
   * @apiUse ForbiddenError
   * @apiUse BadRequestError
   * @apiUse UnprocessableEntityError
   */
  router.post('/', (req, res, next) => {
    if (!req.body.session || req.body.answer === undefined) {
      next(new BadRequestError());
    } else if (!utils.UUID_TEST.test(req.body.session) || Number.isNaN(req.body.answer)) {
      next(new UnprocessableEntityError());
    } else {
      store
        .getSession(req.body.session)
        .then((session) => {
          // Session has not been started
          if (!session || session.questionsAsked.length === 0) {
            return Promise.reject(new ForbiddenError());
          }

          const lastQuestionId = session.questionsAsked[session.questionsAsked.length - 1].id;
          const answer = Math.floor(req.body.answer);

          // Answer is less than 0
          if (answer < 0) {
            return Promise.reject(new UnprocessableEntityError());
          }

          return store.getQuestion(lastQuestionId).then((lastQuestion) => {
            const lastQuestionAsked = session.questionsAsked[session.questionsAsked.length - 1];

            // Answer exceeds possible answers
            if (answer >= lastQuestion.answers.length) {
              return Promise.reject(new UnprocessableEntityError());
            }

            lastQuestionAsked.answer = answer;

            return store.getRandomQuestion().then((question) => {
              session.questionsAsked.push({ id: question.id, answer: null });
              return store.saveSession(session).then(() => {
                res.message = {
                  status: 200,
                  payload: question,
                };
                next();
              });
            });
          });
        })

        .catch(next);
    }
  });

  return router;
};
