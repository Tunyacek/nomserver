import { RegisterSchema } from '../schemas/register.schema'
import { Users } from '@prisma/client'

export interface RegisterService {
  createUser: (user: RegisterSchema) => Promise<Users>
}
