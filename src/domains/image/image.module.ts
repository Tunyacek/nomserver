import { imageRepositoryFactory } from './repositories/image.repository'
import { imageServiceFactory } from './services/image.services'
import { imageControllerFactory } from './controllers/image.controllers'
import { imageRouterFactory } from './routers/image.routers'

export const imageModule = async () => {
  const repository = imageRepositoryFactory()
  const service = imageServiceFactory(repository)
  const controller = imageControllerFactory(service)
  const router = imageRouterFactory(controller)

  return router
}
