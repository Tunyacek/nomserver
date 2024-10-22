'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.loginModule = void 0
const login_controller_1 = require('../controllers/login.controller')
const login_repository_1 = require('../repositories/login.repository')
const login_router_1 = require('../routers/login.router')
const login_service_1 = require('../services/login.service')
const loginModule = () => {
  const repository = (0, login_repository_1.loginRepositoryFactory)()
  const service = (0, login_service_1.loginServiceFactory)(repository)
  const controller = (0, login_controller_1.loginControllerFactory)(service)
  const router = (0, login_router_1.loginRouterFactory)(controller)
  return router
}
exports.loginModule = loginModule
