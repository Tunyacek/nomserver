'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.imageModule = void 0
const image_repository_1 = require('./repositories/image.repository')
const image_services_1 = require('./services/image.services')
const image_controllers_1 = require('./controllers/image.controllers')
const image_routers_1 = require('./routers/image.routers')
const imageModule = async () => {
  const repository = (0, image_repository_1.imageRepositoryFactory)()
  const service = (0, image_services_1.imageServiceFactory)(repository)
  const controller = (0, image_controllers_1.imageControllerFactory)(service)
  const router = (0, image_routers_1.imageRouterFactory)(controller)
  return router
}
exports.imageModule = imageModule
