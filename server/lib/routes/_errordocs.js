/**
 * @apiDefine BadRequestError
 * @apiError BadRequest Required parameters are missing.
 * @apiErrorExample {json}
 * HTTP/1.1 400 Bad Request
 * {
 *   "reason": "Missing parameters."
 * }
 */

/**
 * @apiDefine ForbiddenError
 * @apiError Forbidden Request is forbidden.
 * @apiErrorExample {json}
 * HTTP/1.1 403 Forbidden
 * {
 *   "reason": "Request is forbidden. Did you forget to start the questionnaire?"
 * }
 */

/**
 * @apiDefine UnprocessableEntityError
 * @apiError UnprocessableEntity One or more parameter could not be parsed.
 * @apiErrorExample {json}
 * HTTP/1.1 422 Unprocessable Entity
 * {
 *   "reason": "Parameters could not be parsed."
 * }
 */

