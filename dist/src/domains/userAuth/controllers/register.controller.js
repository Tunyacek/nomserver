'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.registerControllerFactory = void 0
const register_schema_1 = require('../schemas/register.schema')
const errors_1 = require('../../../lib/errors')
const http_status_codes_1 = require('http-status-codes')
const registerControllerFactory = (service) => {
  const createUser = async (req, res, _next) => {
    const { email, username, password } = req.body
    const userBody = { email, username, password }
    const parsedUser = register_schema_1.registerSchema.safeParse(userBody)
    if (!parsedUser.success) {
      throw new errors_1.UnprocessableEntityError(parsedUser.error)
    }
    await service.createUser(req.body)
    return res
      .status(http_status_codes_1.StatusCodes.CREATED)
      .json({ message: 'Uživatel úspěšně vytvořen' })
  }
  return { createUser }
}
exports.registerControllerFactory = registerControllerFactory
