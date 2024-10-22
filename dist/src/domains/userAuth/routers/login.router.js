'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.loginRouterFactory = exports.loginRouter = void 0
const express_1 = __importDefault(require('express'))
const utils_1 = require('../../../lib/utils')
exports.loginRouter = express_1.default.Router()
const loginRouterFactory = (controller) => {
  const loginRouter = express_1.default.Router()
  loginRouter.post('/', (0, utils_1.asyncHandler)(controller.checkUser))
  return loginRouter
}
exports.loginRouterFactory = loginRouterFactory
