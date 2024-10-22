'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.categoryControllerFactory = void 0
const errors_1 = require('../../../lib/errors')
const http_status_codes_1 = require('http-status-codes')
const category_schema_1 = require('../schemas/category.schema')
const categoryControllerFactory = (service) => {
  const getAllCategories = async (_req, res, _next) => {
    const allCategories = await service.getAllCategories()
    return res.status(http_status_codes_1.StatusCodes.OK).json(allCategories)
  }
  const getCategoryById = async (req, res, _next) => {
    const categoryResult = await service.getCategoryById([req.params.id])
    return res.status(http_status_codes_1.StatusCodes.OK).json(categoryResult)
  }
  const createCategory = async (req, res, _next) => {
    const parsedCategory = category_schema_1.categorySchema.safeParse(req.body)
    if (!parsedCategory.success) {
      throw new errors_1.UnprocessableEntityError(parsedCategory.error)
    }
    const createdCategory = await service.createCategory(parsedCategory.data)
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(createdCategory)
  }
  return {
    getAllCategories,
    getCategoryById,
    createCategory,
  }
}
exports.categoryControllerFactory = categoryControllerFactory
