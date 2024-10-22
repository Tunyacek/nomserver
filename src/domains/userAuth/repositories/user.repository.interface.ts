import { Token } from '@prisma/client'

export interface UserRepository {
  createAccessToken: (userId: string, accessToken: string) => Promise<Token>
  //createRefreshToken: (userId: string, refreshToken: string) => Promise<Token>
  findToken: (userId: string, token: string) => Promise<Token | null>
  deleteToken: (userId: string, token: string) => Promise<void>
}
