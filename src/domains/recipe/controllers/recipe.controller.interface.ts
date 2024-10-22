import { type ExpressControllerFn } from '../../../lib/utils'

export interface RecipeController {
  getAllRecipes: ExpressControllerFn
  getRecipeById: ExpressControllerFn
  createRecipe: ExpressControllerFn
  updateRecipe: ExpressControllerFn
  deleteRecipe: ExpressControllerFn
}
