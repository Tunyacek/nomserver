'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.authenticatedUserRouterFactory = exports.userRouter = void 0
const express_1 = __importDefault(require('express'))
const utils_1 = require('../../../lib/utils')
exports.userRouter = express_1.default.Router()
const authenticatedUserRouterFactory = (controller) => {
  const userRouter = express_1.default.Router()
  userRouter.get('/user', (0, utils_1.asyncHandler)(controller.authenticatedUser))
  //userRouter.post('/refresh', asyncHandler(controller.refresh))
  userRouter.post('/logout', (0, utils_1.asyncHandler)(controller.logout))
  return userRouter
}
exports.authenticatedUserRouterFactory = authenticatedUserRouterFactory
