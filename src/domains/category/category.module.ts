import { categoryServiceFactory } from './services/category.services'
import { categoryControllerFactory } from './controllers/category.controller'
import { categoryRouterFactory } from './routers/category.router'
import { categoryRepository } from '../shared/shared.module'

export const categoryModule = () => {
  const service = categoryServiceFactory(categoryRepository)
  const controller = categoryControllerFactory(service)
  const router = categoryRouterFactory(controller)

  return router
}
