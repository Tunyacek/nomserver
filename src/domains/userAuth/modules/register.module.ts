import { registerControllerFactory } from '../controllers/register.controller'
import { loginRepositoryFactory } from '../repositories/login.repository'
import { registerRepositoryFactory } from '../repositories/register.repository'
import { registerRouterFactory } from '../routers/register.router'
import { registerServiceFactory } from '../services/register.service'

export const registerModule = () => {
  const repository = registerRepositoryFactory()
  const loginRepository = loginRepositoryFactory()
  const service = registerServiceFactory(repository, loginRepository)
  const controller = registerControllerFactory(service)
  const router = registerRouterFactory(controller)

  return router
}
