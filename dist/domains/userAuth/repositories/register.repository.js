'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.registerRepositoryFactory = void 0
const prisma_1 = require('../../../lib/prisma')
const registerRepositoryFactory = () => {
  const createUser = async (user) => {
    const { email, username, password } = user
    const createdUser = await prisma_1.prisma.users.create({
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
exports.registerRepositoryFactory = registerRepositoryFactory
