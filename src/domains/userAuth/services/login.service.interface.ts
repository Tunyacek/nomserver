import { Users } from '@prisma/client'

export interface LoginService {
  checkUser: (email: string, password: string) => Promise<Users>
  findUserById: (id: string) => Promise<Users>
}
