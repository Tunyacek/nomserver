import { RecipeSchema } from '../schemas/recipe.schema'
import { Recipe } from '@prisma/client'

export interface RecipeService {
  getAllRecipes: (userId: string) => Promise<Recipe[]>
  getRecipeById: (id: string, userId: string) => Promise<Recipe | null>
  createRecipe: (recipe: RecipeSchema, userId: string) => Promise<Recipe>
  updateRecipe: (id: string, recipe: RecipeSchema, userId: string) => Promise<Recipe>
  deleteRecipe: (id: string, userId: string) => Promise<void>
}
