import express, { Router } from 'express'
import { asyncHandler } from '../../../lib/utils'
import { ImageController } from '../controllers/image.controllers.interface'
import { upload } from '../../../middleware'

export const imageRouter: Router = express.Router()
type ImageRouterFactory = (controller: ImageController) => Router

export const imageRouterFactory: ImageRouterFactory = (controller: ImageController) => {
  const imageRouter = express.Router()

  imageRouter.post('/', upload.single('file'), asyncHandler(controller.uploadImage))

  return imageRouter
}
