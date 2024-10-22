import { prisma } from '../../../lib/prisma'

export const loginRepositoryFactory = () => {
  const findUserByEmail = async (email: string) => {
    return await prisma.users.findUnique({
      where: { email },
    })
  }
  const findUserByUsername = async (username: string) => {
    return await prisma.users.findUnique({
      where: { username },
    })
  }

  const findUserById = async (id: string) => {
    return await prisma.users.findUnique({
      where: { id },
    })
  }

  return { findUserByEmail, findUserByUsername, findUserById }
}
