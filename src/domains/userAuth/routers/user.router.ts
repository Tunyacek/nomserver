import express, { Router } from 'express'
import { asyncHandler } from '../../../lib/utils'
import { UserController } from '../controllers/user.controller.interface'

export const userRouter: Router = express.Router()
type UserRouterFactory = (controller: UserController) => Router

export const authenticatedUserRouterFactory: UserRouterFactory = (controller: UserController) => {
  const userRouter = express.Router()

  userRouter.get('/user', asyncHandler(controller.authenticatedUser))
  //userRouter.post('/refresh', asyncHandler(controller.refresh))
  userRouter.post('/logout', asyncHandler(controller.logout))

  return userRouter
}
