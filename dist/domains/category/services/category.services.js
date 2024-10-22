'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.categoryServiceFactory = void 0
const errors_1 = require('../../../lib/errors')
const categoryServiceFactory = (categoryRepository) => {
  const getAllCategories = async () => {
    return await categoryRepository.getAllCategories()
  }
  const getCategoryById = async (id) => {
    const categoryResult = await categoryRepository.getCategoryById(id)
    if (!categoryResult) {
      throw new errors_1.NotFoundError('Category not found')
    }
    return categoryResult
  }
  const createCategory = async (category) => {
    const createdCategory = await categoryRepository.createCategory(category)
    return createdCategory
  }
  return {
    getAllCategories,
    getCategoryById,
    createCategory,
  }
}
exports.categoryServiceFactory = categoryServiceFactory
