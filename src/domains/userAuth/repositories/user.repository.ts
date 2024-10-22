import { prisma } from '../../../lib/prisma'

export const authenticatedUserRepositoryFactory = () => {
  const createAccessToken = async (userId: string, accessToken: string) => {
    const expiredAt = new Date()
    expiredAt.setDate(expiredAt.getDate() + 7)

    return await prisma.token.create({
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

  const findToken = async (userId: string, token: string) => {
    const foundToken = await prisma.token.findFirst({
      where: {
        userId: userId,
        token: token,

        expiredAt: { gte: new Date() },
      },
    })

    return foundToken || null
  }
  const deleteToken = async (userId: string, token: string) => {
    const foundToken = await prisma.token.findFirst({
      where: { userId, token },
    })

    if (foundToken) {
      await prisma.token.delete({
        where: { id: foundToken.id },
      })
    }
  }

  return { createAccessToken, /*createRefreshToken*/ findToken, deleteToken }
}
