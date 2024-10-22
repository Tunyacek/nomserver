'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.authenticatedUserModule = void 0
const user_controller_1 = require('../controllers/user.controller')
const login_repository_1 = require('../repositories/login.repository')
const user_router_1 = require('../routers/user.router')
const user_service_1 = require('../services/user.service')
const authenticatedUserModule = () => {
  const repository = (0, login_repository_1.loginRepositoryFactory)()
  const service = (0, user_service_1.authenticatedUserServiceFactory)(repository)
  const controller = (0, user_controller_1.authenticatedUserControllerFactory)(service)
  const router = (0, user_router_1.authenticatedUserRouterFactory)(controller)
  return router
}
exports.authenticatedUserModule = authenticatedUserModule