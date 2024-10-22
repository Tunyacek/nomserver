'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.upload = exports.errorHandler = void 0
const errors_1 = require('./lib/errors')
const multer_1 = __importDefault(require('multer'))
const dotenv_1 = __importDefault(require('dotenv'))
dotenv_1.default.config()
const errorHandler = (err, req, res, next) => {
  if (err instanceof errors_1.BaseCustomError) {
    return res.status(err.statusCode).json({
      error: { message: err.message },
    })
  }
  res.status(500).json({
    error: { message: 'Something went wrong' },
  })
}
exports.errorHandler = errorHandler
exports.upload = (0, multer_1.default)({
  storage: multer_1.default.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})
