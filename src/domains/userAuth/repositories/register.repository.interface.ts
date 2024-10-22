import { RegisterSchema } from '../schemas/register.schema'
import { Users } from '@prisma/client'

export interface RegisterRepository {
  createUser: (user: RegisterSchema) => Promise<Users>
}
