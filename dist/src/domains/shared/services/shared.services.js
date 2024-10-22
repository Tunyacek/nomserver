'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.categoryValidationServiceFactory = void 0
const categoryValidationServiceFactory = (categoryRepository) => {
  const categoryExists = async (titles, userId) => {
    const categories = await categoryRepository.getCategoryByTitle(titles, userId)
    return categories.length === titles.length
  }
  const createAfterCheck = async (category, userId) => {
    return await categoryRepository.createCategory(category, userId)
  }
  const getCategoryByTitle = async (titles, userId) => {
    return await categoryRepository.getCategoryByTitle(titles, userId)
  }
  return {
    categoryExists,
    createAfterCheck,
    getCategoryByTitle,
  }
}
exports.categoryValidationServiceFactory = categoryValidationServiceFactory
