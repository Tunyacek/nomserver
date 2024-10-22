'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.authenticate = exports.upload = exports.errorHandler = void 0
const errors_1 = require('./lib/errors')
const multer_1 = __importDefault(require('multer'))
const dotenv_1 = __importDefault(require('dotenv'))
const jsonwebtoken_1 = require('jsonwebtoken')
dotenv_1.default.config()
const errorHandler = (err, _req, res, _next) => {
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
const accessSecret = process.env.JWT_ACCESS_SECRET || 'pleasewritemeindotenv'
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1] || ''
    if (!token) {
      return res.status(401).json({ message: 'Přístup odepřen: Nebyl nalezen žádný token' })
    }
    const payload = (0, jsonwebtoken_1.verify)(token, accessSecret)
    if (!payload) {
      return res.status(401).json({ message: 'Přístup odepřen: Špatný token' })
    }
    next()
  } catch (error) {
    console.error('Authentication error:', error)
    return res
      .status(401)
      .json({ message: 'Neautentikováno: Špatný token nebo uživatel neautentikován' })
  }
}
exports.authenticate = authenticate
