import { UnauthorizedError } from '../../../lib/errors'
import { LoginRepository } from '../repositories/login.repository.interface'
import { UserRepository } from '../repositories/user.repository.interface'

export const authenticatedUserServiceFactory = (
  loginRepository: LoginRepository,
  userRepository: UserRepository
) => {
  const authenticatedUser = async (userId: string) => {
    try {
      const user = await loginRepository.findUserById(userId)
      if (!user) {
        console.error(`User not found with ID: ${userId}`)
        throw new UnauthorizedError('Neautentikováno')
      }
      return user
    } catch (error) {
      console.error('Error fetching user:', error)
      throw error
    }
  }

  const createAccessToken = async (userId: string, accessToken: string) => {
    return await userRepository.createAccessToken(userId, accessToken)
  }

  /*const createRefreshToken = async (userId: string, refreshToken: string) => {
    return await userRepository.createRefreshToken(userId, refreshToken)
  }*/

  const findToken = async (userId: string, token: string) => {
    return await userRepository.findToken(userId, token)
  }

  const deleteToken = async (userId: string, token: string) => {
    await userRepository.deleteToken(userId, token)
  }

  return { authenticatedUser, createAccessToken, /*createRefreshToken*/ findToken, deleteToken }
}
