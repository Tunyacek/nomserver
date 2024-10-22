import { RecipeSchema } from '../schemas/recipe.schema'
import { Recipe } from '@prisma/client'

export interface RecipeRepository {
  getAllRecipes: (userId: string) => Promise<Recipe[]>
  getRecipeById: (id: string, userId: string) => Promise<Recipe | null>
  createRecipe: (recipe: RecipeSchema, userId: string) => Promise<Recipe>
  updateRecipe: (id: string, recipe: RecipeSchema) => Promise<Recipe>
  deleteRecipe: (id: string) => Promise<void>
}
