'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.loginServiceFactory = void 0
const errors_1 = require('../../../lib/errors')
const bcrypt_1 = __importDefault(require('bcrypt'))
const loginServiceFactory = (loginRepository) => {
  const checkUser = async (username, password) => {
    const user = await loginRepository.findUserByUsername(username)
    if (!user) {
      throw new errors_1.NotFoundError('Chybně zadané údaje')
    }
    const isPasswordValid = await bcrypt_1.default.compare(password, user.password)
    if (!isPasswordValid) {
      throw new errors_1.NotFoundError('Chybně zadané údaje')
    }
    return user
  }
  const findUserById = async (id) => {
    try {
      const user = await loginRepository.findUserById(id)
      if (!user) {
        throw new errors_1.NotFoundError('Uživatel nenalezen')
      }
      return user
    } catch (error) {
      throw new errors_1.UnauthorizedError('Přístup odepřen')
    }
  }
  return { checkUser, findUserById }
}
exports.loginServiceFactory = loginServiceFactory
