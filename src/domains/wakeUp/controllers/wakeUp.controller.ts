import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ExpressControllerFn } from '../../../lib/utils'

type WakeUpControllerFactory = () => {
  wakeUp: ExpressControllerFn
}

export const wakeUpControllerFactory: WakeUpControllerFactory = () => {
  const wakeUp = async (_req: Request, res: Response, _next: NextFunction) => {
    return res.status(StatusCodes.OK)
  }
  return { wakeUp }
}
