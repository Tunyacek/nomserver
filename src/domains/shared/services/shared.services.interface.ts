import { Category } from '@prisma/client'
import { CategorySchema } from '../../category/schemas/category.schema'

export interface CategoryValidationService {
  categoryExists: (id: string[], userId: string) => Promise<boolean>
  createAfterCheck: (category: CategorySchema, userId: string) => Promise<Category>
  getCategoryByTitle: (titles: string[], userId: string) => Promise<Category[]>
}
