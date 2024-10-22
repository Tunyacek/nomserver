import { ConflictError } from '../../../lib/errors'
import { LoginRepository } from '../repositories/login.repository.interface'
import { RegisterRepository } from '../repositories/register.repository.interface'
import { RegisterSchema } from '../schemas/register.schema'
import 'dotenv/config'
import bcrypt from 'bcrypt'

const saltRoundsStr = process.env.SALT_ROUNDS
const saltRounds = saltRoundsStr ? parseInt(saltRoundsStr, 10) : 10

export const registerServiceFactory = (
  registerRepository: RegisterRepository,
  loginRepository: LoginRepository
) => {
  const createUser = async (user: RegisterSchema) => {
    const { email, password, username } = user

    const checkEmail = await loginRepository.findUserByEmail(email)
    if (checkEmail) {
      throw new ConflictError('Uživatel s tímto emailem již existuje')
    }

    const checkUsername = await loginRepository.findUserByUsername(username)
    if (checkUsername) {
      throw new ConflictError('Uživatel s tímto uživatelským jménem již existuje')
    }

    const hashedPassword = await new Promise<string>((resolve, reject) => {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
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
