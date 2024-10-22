import { authenticatedUserControllerFactory } from '../controllers/user.controller'
import { loginRepositoryFactory } from '../repositories/login.repository'
import { authenticatedUserRepositoryFactory } from '../repositories/user.repository'
import { authenticatedUserRouterFactory } from '../routers/user.router'
import { authenticatedUserServiceFactory } from '../services/user.service'

export const authenticatedUserModule = () => {
  const loginRepository = loginRepositoryFactory()
  const userRepository = authenticatedUserRepositoryFactory()
  const service = authenticatedUserServiceFactory(loginRepository, userRepository)
  const controller = authenticatedUserControllerFactory(service)
  const router = authenticatedUserRouterFactory(controller)

  return router
}
