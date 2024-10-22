'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.authenticatedUserServiceFactory = void 0
const errors_1 = require('../../../lib/errors')
const authenticatedUserServiceFactory = (loginRepository) => {
  const authenticatedUser = async (userId) => {
    const user = await loginRepository.findUserById(userId)
    if (!user) {
      throw new errors_1.UnauthorizedError('Neautentikováno')
    }
    return user
  }
  return { authenticatedUser }
}
exports.authenticatedUserServiceFactory = authenticatedUserServiceFactory
