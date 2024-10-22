import { CategoryRepository } from '../../category/repositories/category.repository.interface'
import { CategorySchema } from '../../category/schemas/category.schema'

export const categoryValidationServiceFactory = (categoryRepository: CategoryRepository) => {
  const categoryExists = async (titles: string[], userId: string) => {
    const categories = await categoryRepository.getCategoryByTitle(titles, userId)
    return categories.length === titles.length
  }

  const createAfterCheck = async (category: CategorySchema, userId: string) => {
    return await categoryRepository.createCategory(category, userId)
  }

  const getCategoryByTitle = async (titles: string[], userId: string) => {
    return await categoryRepository.getCategoryByTitle(titles, userId)
  }

  return {
    categoryExists,
    createAfterCheck,
    getCategoryByTitle,
  }
}
