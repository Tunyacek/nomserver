import express, { Router } from 'express'
import { RegisterController } from '../controllers/register.controller.interface'
import { asyncHandler } from '../../../lib/utils'

export const registerRouter: Router = express.Router()
type RegisterRouterFactory = (controller: RegisterController) => Router

export const registerRouterFactory: RegisterRouterFactory = (controller: RegisterController) => {
  const registerRouter = express.Router()

  registerRouter.post('/', asyncHandler(controller.createUser))

  return registerRouter
}
