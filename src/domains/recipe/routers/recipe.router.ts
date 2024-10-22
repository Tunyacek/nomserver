import express, { Router } from 'express'
import { RecipeController } from '../controllers/recipe.controller.interface'
import { asyncHandler } from '../../../lib/utils'

export const recipeRouter: Router = express.Router()
type RecipeRouterFactory = (controller: RecipeController) => Router

export const recipeRouterFactory: RecipeRouterFactory = (controller: RecipeController) => {
  const recipeRouter = express.Router()

  // asyncHandler wrapper is a workaround to directly pass thrown errors into the error middleware
  // Without it thrown errors were not cauught by the global error middleware
  recipeRouter.get('/', asyncHandler(controller.getAllRecipes))
  recipeRouter.get('/:id', asyncHandler(controller.getRecipeById))
  recipeRouter.post('/', asyncHandler(controller.createRecipe))
  recipeRouter.put('/:id', asyncHandler(controller.updateRecipe))
  recipeRouter.delete('/:id', asyncHandler(controller.deleteRecipe))

  return recipeRouter
}
