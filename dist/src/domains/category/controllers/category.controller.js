'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.categoryControllerFactory = void 0
const errors_1 = require('../../../lib/errors')
const http_status_codes_1 = require('http-status-codes')
const category_schema_1 = require('../schemas/category.schema')
require('dotenv/config')
const jsonwebtoken_1 = require('jsonwebtoken')
const secretAccessKey = process.env.JWT_ACCESS_SECRET || 'pleasewritemeindotenv'
const categoryControllerFactory = (service) => {
  const getAllCategories = async (req, res, _next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res
        .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
        .json({ message: 'Uživatel neautentikován.' })
    }
    const token = authHeader.split(' ')[1]
    const decoded = (0, jsonwebtoken_1.verify)(token, secretAccessKey)
    const userId = decoded.id
    if (!userId) {
      return res
        .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
        .json({ message: 'Uživatel neautentikován.' })
    }
    const allCategories = await service.getAllCategories(userId)
    return res.status(http_status_codes_1.StatusCodes.OK).json(allCategories)
  }
  const getCategoryById = async (req, res, _next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res
        .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
        .json({ message: 'Uživatel neautentikován.' })
    }
    const token = authHeader.split(' ')[1]
    const decoded = (0, jsonwebtoken_1.verify)(token, secretAccessKey)
    const userId = decoded.id
    if (!userId) {
      return res
        .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
        .json({ message: 'Uživatel neautentikován.' })
    }
    const categoryResult = await service.getCategoryById([req.params.id], userId)
    return res.status(http_status_codes_1.StatusCodes.OK).json(categoryResult)
  }
  const createCategory = async (req, res, _next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res
        .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
        .json({ message: 'Uživatel neautentikován.' })
    }
    const token = authHeader.split(' ')[1]
    const decoded = (0, jsonwebtoken_1.verify)(token, secretAccessKey)
    const userId = decoded.id
    if (!userId) {
      return res
        .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
        .json({ message: 'Uživatel neautentikován.' })
    }
    const parsedCategory = category_schema_1.categorySchema.safeParse({ ...req.body, userId })
    if (!parsedCategory.success) {
      throw new errors_1.UnprocessableEntityError(parsedCategory.error)
    }
    const createdCategory = await service.createCategory(parsedCategory.data, userId)
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(createdCategory)
  }
  return {
    getAllCategories,
    getCategoryById,
    createCategory,
  }
}
exports.categoryControllerFactory = categoryControllerFactory
