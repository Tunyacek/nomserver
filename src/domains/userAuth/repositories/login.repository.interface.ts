import { Users } from '@prisma/client'

export interface LoginRepository {
  findUserByEmail: (email: string) => Promise<Users | null>
  findUserByUsername: (username: string) => Promise<Users | null>
  findUserById: (id: string) => Promise<Users | null>
}
