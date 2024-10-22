'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.registerRouterFactory = exports.registerRouter = void 0
const express_1 = __importDefault(require('express'))
const utils_1 = require('../../../lib/utils')
exports.registerRouter = express_1.default.Router()
const registerRouterFactory = (controller) => {
  const registerRouter = express_1.default.Router()
  registerRouter.post('/', (0, utils_1.asyncHandler)(controller.createUser))
  return registerRouter
}
exports.registerRouterFactory = registerRouterFactory
