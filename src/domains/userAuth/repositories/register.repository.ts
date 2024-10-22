import { prisma } from '../../../lib/prisma'
import { RegisterSchema } from '../schemas/register.schema'

export const registerRepositoryFactory = () => {
  const createUser = async (user: RegisterSchema) => {
    const { email, username, password } = user
    const createdUser = await prisma.users.create({
      data: {
        email,
        username,
        password,
      },
    })
    return createdUser
  }
  return { createUser }
}
