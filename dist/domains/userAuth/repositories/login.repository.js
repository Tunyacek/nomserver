'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.loginRepositoryFactory = void 0
const prisma_1 = require('../../../lib/prisma')
const loginRepositoryFactory = () => {
  const findUserByEmail = async (email) => {
    return await prisma_1.prisma.users.findUnique({
      where: { email },
    })
  }
  const findUserByUsername = async (username) => {
    return await prisma_1.prisma.users.findUnique({
      where: { username },
    })
  }
  const findUserById = async (id) => {
    return await prisma_1.prisma.users.findUnique({
      where: { id },
    })
  }
  return { findUserByEmail, findUserByUsername, findUserById }
}
exports.loginRepositoryFactory = loginRepositoryFactory
