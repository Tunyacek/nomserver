'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.registerServiceFactory = void 0
const errors_1 = require('../../../lib/errors')
require('dotenv/config')
const bcrypt_1 = __importDefault(require('bcrypt'))
const saltRoundsStr = process.env.SALT_ROUNDS
const saltRounds = saltRoundsStr ? parseInt(saltRoundsStr, 10) : 10
const registerServiceFactory = (registerRepository, loginRepository) => {
  const createUser = async (user) => {
    const { email, password, username } = user
    const checkEmail = await loginRepository.findUserByEmail(email)
    if (checkEmail) {
      throw new errors_1.ConflictError('Uživatel s tímto emailem již existuje')
    }
    const checkUsername = await loginRepository.findUserByUsername(username)
    if (checkUsername) {
      throw new errors_1.ConflictError('Uživatel s tímto uživatelským jménem již existuje')
    }
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt_1.default.hash(password, saltRounds, async (err, hash) => {
        if (err) return reject(err)
        resolve(hash)
      })
    })
    const createdUser = await registerRepository.createUser({
      ...user,
      password: hashedPassword,
    })
    return createdUser
  }
  return { createUser }
}
exports.registerServiceFactory = registerServiceFactory
