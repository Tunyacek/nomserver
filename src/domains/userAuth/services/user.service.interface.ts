import { Token, Users } from '@prisma/client'

export interface UserService {
  authenticatedUser: (userId: string) => Promise<Users>
  createAccessToken: (userId: string, accessToken: string) => Promise<Token>
  //createRefreshToken: (userId: string, refreshToken: string) => Promise<Token>
  findToken: (userId: string, token: string) => Promise<Token | null>
  deleteToken: (userId: string, token: string) => Promise<void>
}
