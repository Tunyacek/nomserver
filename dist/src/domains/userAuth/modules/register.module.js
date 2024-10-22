'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.registerModule = void 0
const register_controller_1 = require('../controllers/register.controller')
const login_repository_1 = require('../repositories/login.repository')
const register_repository_1 = require('../repositories/register.repository')
const register_router_1 = require('../routers/register.router')
const register_service_1 = require('../services/register.service')
const registerModule = () => {
  const repository = (0, register_repository_1.registerRepositoryFactory)()
  const loginRepository = (0, login_repository_1.loginRepositoryFactory)()
  const service = (0, register_service_1.registerServiceFactory)(repository, loginRepository)
  const controller = (0, register_controller_1.registerControllerFactory)(service)
  const router = (0, register_router_1.registerRouterFactory)(controller)
  return router
}
exports.registerModule = registerModule
