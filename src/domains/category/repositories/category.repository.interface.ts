import { Category } from '@prisma/client'
import { CategorySchema } from '../schemas/category.schema'

export interface CategoryRepository {
  getAllCategories: (userId: string) => Promise<Category[]>
  getCategoryByTitle: (title: string[], userId: string) => Promise<Category[]>
  getCategoryById: (id: string[], userId: string) => Promise<Category[]>
  createCategory: (category: CategorySchema, userId: string) => Promise<Category>
}
