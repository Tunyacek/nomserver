import { type ExpressControllerFn } from '../../../lib/utils'

export interface CategoryController {
  getAllCategories: ExpressControllerFn
  getCategoryById: ExpressControllerFn
  createCategory: ExpressControllerFn
}
