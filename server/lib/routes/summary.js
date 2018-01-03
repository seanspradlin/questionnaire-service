const { Router } = require('express');
const { ForbiddenError, BadRequestError, UnprocessableEntityError } = require('../errors');
const utils = require('../utils');

module.exports = (store) => {
  const router = new Router();

  /**
   * @api {get} /summary Get a summary of questions
   * @apiName GetSummary
   * @apiVersion 1.0.0
   * @apiGroup Questionnaire
   * @apiDescription
   *   Get an aggregate list of all questions and their answers in the order they were presented.
   *
   * @apiParam {UUID} session Session ID
   *
   * @apiSuccess {Object[]} questionnaire
   * @apiSuccess {String}   questionnaire.question    Question to be asked
   * @apiSuccess {String[]} questionnaire.answers     Collection of answers
   * @apiSuccess {Number}   [questionnaire.selected]  Element of selected answer
   *
   * @apiSuccessExample
   * HTTP/1.1 200 OK
   * [
   *   {
   *     "question": "What should we have for lunch?",
   *     "answers": [
   *       "Hamburgers",
   *       "Pizza",
   *       "Tacos",
   *       "Sushi"
   *     ],
   *     "selected": 1
   *   },
   *   {
   *     "question": "How much do you exercise a week?",
   *     "answers": [
   *       "Never",
   *       "Less than an hour",
   *       "Between one and five hours",
   *       "Between five and ten hours",
   *       "More than ten hours"
   *     ],
   *   }
   * ]
   *
   * @apiUse BadRequestError
   * @apiUse UnprocessableEntityError
   * @apiUse ForbiddenError
   */
  router.get('/', (req, res, next) => {
    if (!req.query.session) {
      next(new BadRequestError());
    } else if (!utils.UUID_TEST.test(req.query.session)) {
      next(new UnprocessableEntityError());
    } else {
      store
        .getSession(req.query.session)
        .then((session) => {
          if (!session || session.questionsAsked.length === 0) {
            return Promise.reject(new ForbiddenError());
          }
          return Promise.all(session.questionsAsked.map(questionId => store.getQuestion(questionId)));
        })
        .then((questions) => {
          res.message = { status: 200, payload: questions };
          next();
        })
        .catch(next);
    }
  });

  return router;
};
