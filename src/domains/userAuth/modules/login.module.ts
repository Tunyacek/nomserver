import { loginControllerFactory } from '../controllers/login.controller'
import { loginRepositoryFactory } from '../repositories/login.repository'
import { authenticatedUserRepositoryFactory } from '../repositories/user.repository'
import { loginRouterFactory } from '../routers/login.router'
import { loginServiceFactory } from '../services/login.service'
import { authenticatedUserServiceFactory } from '../services/user.service'

export const loginModule = () => {
  const loginRepository = loginRepositoryFactory()
  const userRepository = authenticatedUserRepositoryFactory()
  const loginService = loginServiceFactory(loginRepository)
  const userService = authenticatedUserServiceFactory(loginRepository, userRepository)
  const controller = loginControllerFactory(loginService, userService)
  const router = loginRouterFactory(controller)

  return router
}
