'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.UnauthorizedError =
  exports.ConflictError =
  exports.UnprocessableEntityError =
  exports.NotFoundError =
  exports.BaseCustomError =
    void 0
const zod_1 = require('zod')
const http_status_codes_1 = require('http-status-codes')
class BaseCustomError extends Error {
  constructor(message) {
    let formattedMessage
    if (message instanceof zod_1.ZodError) {
      formattedMessage = BaseCustomError.formatZodError(message)
    } else {
      formattedMessage = message
    }
    super(formattedMessage)
    this.name = this.constructor.name
    Object.setPrototypeOf(this, BaseCustomError.prototype)
  }
  static formatZodError(zodError) {
    return zodError.issues.map((issue) => `${issue.path.join('.')} - ${issue.message}`).join(', ')
  }
}
exports.BaseCustomError = BaseCustomError
class NotFoundError extends BaseCustomError {
  statusCode = http_status_codes_1.StatusCodes.NOT_FOUND
  constructor(message = 'Entity Not Found') {
    super(message)
  }
}
exports.NotFoundError = NotFoundError
class UnprocessableEntityError extends BaseCustomError {
  statusCode = http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY
  constructor(message = 'Unprocessable Entity') {
    super(message)
  }
}
exports.UnprocessableEntityError = UnprocessableEntityError
class ConflictError extends BaseCustomError {
  statusCode = http_status_codes_1.StatusCodes.CONFLICT
  constructor(message = 'User with this email already exists.') {
    super(message)
  }
}
exports.ConflictError = ConflictError
class UnauthorizedError extends BaseCustomError {
  statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED
  constructor(message = 'You are not authenticated') {
    super(message)
  }
}
exports.UnauthorizedError = UnauthorizedError
