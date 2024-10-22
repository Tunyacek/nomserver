'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.imageRouterFactory = exports.imageRouter = void 0
const express_1 = __importDefault(require('express'))
const utils_1 = require('../../../lib/utils')
const middleware_1 = require('../../../middleware')
exports.imageRouter = express_1.default.Router()
const imageRouterFactory = (controller) => {
  const imageRouter = express_1.default.Router()
  imageRouter.post(
    '/',
    middleware_1.upload.single('file'),
    (0, utils_1.asyncHandler)(controller.uploadImage)
  )
  return imageRouter
}
exports.imageRouterFactory = imageRouterFactory
