'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.categoryServiceFactory = void 0
const errors_1 = require('../../../lib/errors')
const categoryServiceFactory = (categoryRepository) => {
  const getAllCategories = async (userId) => {
    return await categoryRepository.getAllCategories(userId)
  }
  const getCategoryByTitle = async (title, userId) => {
    const categoryResult = await categoryRepository.getCategoryByTitle(title, userId)
    if (!categoryResult) {
      throw new errors_1.NotFoundError('Kategorie nenalezena')
    }
    return categoryResult
  }
  const getCategoryById = async (id, userId) => {
    const categoryResult = await categoryRepository.getCategoryByTitle(id, userId)
    if (!categoryResult) {
      throw new errors_1.NotFoundError('Kategorie nenalezena')
    }
    return categoryResult
  }
  const createCategory = async (category, userId) => {
    const createdCategory = await categoryRepository.createCategory(category, userId)
    return createdCategory
  }
  return {
    getAllCategories,
    getCategoryById,
    getCategoryByTitle,
    createCategory,
  }
}
exports.categoryServiceFactory = categoryServiceFactory
