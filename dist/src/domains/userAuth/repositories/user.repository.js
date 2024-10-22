'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.authenticatedUserRepositoryFactory = void 0
const prisma_1 = require('../../../lib/prisma')
const authenticatedUserRepositoryFactory = () => {
  const createAccessToken = async (userId, accessToken) => {
    const expiredAt = new Date()
    expiredAt.setDate(expiredAt.getDate() + 7)
    return await prisma_1.prisma.token.create({
      data: {
        userId: userId,
        token: accessToken,
        expiredAt,
      },
    })
  }
  /*const createRefreshToken = async (userId: string, refreshToken: string) => {
      const expiredAt = new Date()
      expiredAt.setDate(expiredAt.getDate() + 7)
  
      return await prisma.token.create({
        data: {
          userId: userId,
          token: refreshToken,
          expiredAt,
        },
      })
    }*/
  const findToken = async (userId, token) => {
    const foundToken = await prisma_1.prisma.token.findFirst({
      where: {
        userId: userId,
        token: token,
        expiredAt: { gte: new Date() },
      },
    })
    return foundToken || null
  }
  const deleteToken = async (userId, token) => {
    const foundToken = await prisma_1.prisma.token.findFirst({
      where: { userId, token },
    })
    if (foundToken) {
      await prisma_1.prisma.token.delete({
        where: { id: foundToken.id },
      })
    }
  }
  return { createAccessToken, /*createRefreshToken*/ findToken, deleteToken }
}
exports.authenticatedUserRepositoryFactory = authenticatedUserRepositoryFactory
