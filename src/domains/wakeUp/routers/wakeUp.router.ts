import express, { Router } from 'express'
import { WakeUpController } from '../controllers/wakeUp.controller.interface'
import { asyncHandler } from '../../../lib/utils'

export const wakeUpRouter: Router = express.Router()
type WakeUpRouterFactory = (controller: WakeUpController) => Router

export const wakeUpRouterFactory: WakeUpRouterFactory = (controller: WakeUpController) => {
  const wakeUpRouter = express.Router()

  wakeUpRouter.get('/', asyncHandler(controller.wakeUp))

  return wakeUpRouter
}
