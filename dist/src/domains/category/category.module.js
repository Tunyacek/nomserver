'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.categoryModule = void 0
const category_services_1 = require('./services/category.services')
const category_controller_1 = require('./controllers/category.controller')
const category_router_1 = require('./routers/category.router')
const shared_module_1 = require('../shared/shared.module')
const categoryModule = () => {
  const service = (0, category_services_1.categoryServiceFactory)(
    shared_module_1.categoryRepository
  )
  const controller = (0, category_controller_1.categoryControllerFactory)(service)
  const router = (0, category_router_1.categoryRouterFactory)(controller)
  return router
}
exports.categoryModule = categoryModule
