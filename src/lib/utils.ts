import type { Request, Response, NextFunction } from 'express'

export type ExpressControllerFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response<unknown> | void>

export const asyncHandler =
  (fn: ExpressControllerFn) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next)
