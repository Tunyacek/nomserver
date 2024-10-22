import { NotFoundError, UnauthorizedError } from '../../../lib/errors'
import { LoginRepository } from '../repositories/login.repository.interface'
import bcrypt from 'bcrypt'

export const loginServiceFactory = (loginRepository: LoginRepository) => {
  const checkUser = async (username: string, password: string) => {
    const user = await loginRepository.findUserByUsername(username)
    if (!user) {
      throw new NotFoundError('Chybně zadané údaje')
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new NotFoundError('Chybně zadané údaje')
    }
    return user
  }

  const findUserById = async (id: string) => {
    try {
      const user = await loginRepository.findUserById(id)
      if (!user) {
        throw new NotFoundError('Uživatel nenalezen')
      }
      return user
    } catch (error) {
      throw new UnauthorizedError('Přístup odepřen')
    }
  }

  return { checkUser, findUserById }
}
