'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.loginModule = void 0
const login_controller_1 = require('../controllers/login.controller')
const login_repository_1 = require('../repositories/login.repository')
const user_repository_1 = require('../repositories/user.repository')
const login_router_1 = require('../routers/login.router')
const login_service_1 = require('../services/login.service')
const user_service_1 = require('../services/user.service')
const loginModule = () => {
  const loginRepository = (0, login_repository_1.loginRepositoryFactory)()
  const userRepository = (0, user_repository_1.authenticatedUserRepositoryFactory)()
  const loginService = (0, login_service_1.loginServiceFactory)(loginRepository)
  const userService = (0, user_service_1.authenticatedUserServiceFactory)(
    loginRepository,
    userRepository
  )
  const controller = (0, login_controller_1.loginControllerFactory)(loginService, userService)
  const router = (0, login_router_1.loginRouterFactory)(controller)
  return router
}
exports.loginModule = loginModule
