import express, { Router } from 'express'
import { LoginController } from '../controllers/login.controller.interface'
import { asyncHandler } from '../../../lib/utils'

export const loginRouter: Router = express.Router()
type LoginRouterFactory = (controller: LoginController) => Router

export const loginRouterFactory: LoginRouterFactory = (controller: LoginController) => {
  const loginRouter = express.Router()

  loginRouter.post('/', asyncHandler(controller.checkUser))

  return loginRouter
}
