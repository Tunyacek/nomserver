import { wakeUpControllerFactory } from './controllers/wakeUp.controller'
import { wakeUpRouterFactory } from './routers/wakeUp.router'

export const wakeUpModule = () => {
  const controller = wakeUpControllerFactory()
  const router = wakeUpRouterFactory(controller)

  return router
}
