'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.authenticatedUserServiceFactory = void 0
const errors_1 = require('../../../lib/errors')
const authenticatedUserServiceFactory = (loginRepository, userRepository) => {
  const authenticatedUser = async (userId) => {
    try {
      const user = await loginRepository.findUserById(userId)
      if (!user) {
        console.error(`User not found with ID: ${userId}`)
        throw new errors_1.UnauthorizedError('Neautentikováno')
      }
      return user
    } catch (error) {
      console.error('Error fetching user:', error)
      throw error
    }
  }
  const createAccessToken = async (userId, accessToken) => {
    return await userRepository.createAccessToken(userId, accessToken)
  }
  /*const createRefreshToken = async (userId: string, refreshToken: string) => {
      return await userRepository.createRefreshToken(userId, refreshToken)
    }*/
  const findToken = async (userId, token) => {
    return await userRepository.findToken(userId, token)
  }
  const deleteToken = async (userId, token) => {
    await userRepository.deleteToken(userId, token)
  }
  return { authenticatedUser, createAccessToken, /*createRefreshToken*/ findToken, deleteToken }
}
exports.authenticatedUserServiceFactory = authenticatedUserServiceFactory
