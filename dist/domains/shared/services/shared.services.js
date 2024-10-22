'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.categoryValidationServiceFactory = void 0
const categoryValidationServiceFactory = (categoryRepository) => {
  const categoryExists = async (ids) => {
    const categories = await categoryRepository.getCategoryById(ids)
    return categories.length === ids.length
  }
  return {
    categoryExists,
  }
}
exports.categoryValidationServiceFactory = categoryValidationServiceFactory
