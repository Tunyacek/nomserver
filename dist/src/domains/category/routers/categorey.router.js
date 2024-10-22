'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.categoryRouterFactory = exports.categoryRouter = void 0
const express_1 = __importDefault(require('express'))
const utils_1 = require('../../../lib/utils')
exports.categoryRouter = express_1.default.Router()
const categoryRouterFactory = (controller) => {
  const categoryRouter = express_1.default.Router()
  categoryRouter.get('/', (0, utils_1.asyncHandler)(controller.getAllCategories))
  categoryRouter.get('/:id', (0, utils_1.asyncHandler)(controller.getCategoryById))
  return categoryRouter
}
exports.categoryRouterFactory = categoryRouterFactory
