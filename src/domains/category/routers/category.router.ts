import express, { Router } from 'express'
import { CategoryController } from '../controllers/category.controller.interface'
import { asyncHandler } from '../../../lib/utils'

export const categoryRouter: Router = express.Router()
type CategoryRouterFactory = (controller: CategoryController) => Router

export const categoryRouterFactory: CategoryRouterFactory = (controller: CategoryController) => {
  const categoryRouter = express.Router()

  categoryRouter.get('/', asyncHandler(controller.getAllCategories))
  categoryRouter.get('/:id', asyncHandler(controller.getCategoryById))
  categoryRouter.post('/', asyncHandler(controller.createCategory))

  return categoryRouter
}
