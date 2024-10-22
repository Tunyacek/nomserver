import { Request, Response, NextFunction } from 'express'
import { registerSchema } from '../schemas/register.schema'
import { RegisterService } from '../services/register.service.interface'
import { ExpressControllerFn } from '../../../lib/utils'
import { UnprocessableEntityError } from '../../../lib/errors'
import { StatusCodes } from 'http-status-codes'

type RegisterControllerFactory = (service: RegisterService) => {
  createUser: ExpressControllerFn
}

export const registerControllerFactory: RegisterControllerFactory = (service: RegisterService) => {
  const createUser = async (req: Request, res: Response, _next: NextFunction) => {
    const { email, username, password } = req.body
    const userBody = { email, username, password }
    const parsedUser = registerSchema.safeParse(userBody)
    if (!parsedUser.success) {
      throw new UnprocessableEntityError(parsedUser.error)
    }
    await service.createUser(req.body)
    return res.status(StatusCodes.CREATED).json({ message: 'Uživatel úspěšně vytvořen' })
  }
  return { createUser }
}
