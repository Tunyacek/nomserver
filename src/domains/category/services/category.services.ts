import { CategoryRepository } from '../repositories/category.repository.interface'
import { NotFoundError } from '../../../lib/errors'
import { CategorySchema } from '../schemas/category.schema'

export const categoryServiceFactory = (categoryRepository: CategoryRepository) => {
  const getAllCategories = async (userId: string) => {
    return await categoryRepository.getAllCategories(userId)
  }

  const getCategoryByTitle = async (title: string[], userId: string) => {
    const categoryResult = await categoryRepository.getCategoryByTitle(title, userId)
    if (!categoryResult) {
      throw new NotFoundError('Kategorie nenalezena')
    }
    return categoryResult
  }
  const getCategoryById = async (id: string[], userId: string) => {
    const categoryResult = await categoryRepository.getCategoryByTitle(id, userId)
    if (!categoryResult) {
      throw new NotFoundError('Kategorie nenalezena')
    }
    return categoryResult
  }

  const createCategory = async (category: CategorySchema, userId: string) => {
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
