import { ZodError, type ZodIssue } from 'zod'
import { StatusCodes } from 'http-status-codes'

export abstract class BaseCustomError extends Error {
  abstract statusCode: number

  constructor(message: string | ZodError) {
    let formattedMessage: string
    if (message instanceof ZodError) {
      formattedMessage = BaseCustomError.formatZodError(message)
    } else {
      formattedMessage = message
    }

    super(formattedMessage)

    this.name = this.constructor.name
    Object.setPrototypeOf(this, BaseCustomError.prototype)
  }

  private static formatZodError(zodError: ZodError): string {
    return zodError.issues
      .map((issue: ZodIssue) => `${issue.path.join('.')} - ${issue.message}`)
      .join(', ')
  }
}

export class NotFoundError extends BaseCustomError {
  statusCode = StatusCodes.NOT_FOUND

  constructor(message = 'Entity Not Found') {
    super(message)
  }
}

export class UnprocessableEntityError extends BaseCustomError {
  statusCode = StatusCodes.UNPROCESSABLE_ENTITY

  constructor(message: string | ZodError = 'Unprocessable Entity') {
    super(message)
  }
}

export class ConflictError extends BaseCustomError {
  statusCode = StatusCodes.CONFLICT

  constructor(message = 'User with this email already exists.') {
    super(message)
  }
}

export class UnauthorizedError extends BaseCustomError {
  statusCode = StatusCodes.UNAUTHORIZED

  constructor(message = 'You are not authenticated') {
    super(message)
  }
}
