const { Router } = require('express');

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
 * @apiSuccess {String}   questionnaire.question  Question to be asked
 * @apiSuccess {String[]} questionnaire.answers   Collection of answers
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
 *     ]
 *   },
 *   {
 *     "question": "How much do you exercise a week?",
 *     "answers": [
 *       "Never",
 *       "Less than an hour",
 *       "Between one and five hours",
 *       "Between five and ten hours",
 *       "More than ten hours"
 *     ]
 *   }
 * ]
 *
 * @apiUse BadRequestError
 * @apiUse UnprocessableEntityError
 */
router.get('/summary', (req, res, next) => {
  next(new Error('not implemented'));
});

module.exports = router;

