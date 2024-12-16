import { RecipeRepository } from '../repositories/recipe.repository.interface'
import { RecipeSchema } from '../schemas/recipe.schema'
import { NotFoundError } from '../../../lib/errors'
import { CategoryValidationService } from '../../shared/services/shared.services.interface'

export const recipeServiceFactory = (
  recipeRepository: RecipeRepository,
  categoryValidationService: CategoryValidationService
) => {
  const getAllRecipes = async (userId: string) => {
    return await recipeRepository.getAllRecipes(userId)
  }

  const getRecipeById = async (id: string, userId: string) => {
    const recipeResult = await recipeRepository.getRecipeById(id, userId)
    if (!recipeResult) {
      throw new NotFoundError('Recept nenalezen')
    }
    return recipeResult
  }

  const createRecipe = async (recipe: RecipeSchema, userId: string) => {
    const categoryTitles = recipe.categoryTitles

    const categoryIds = await Promise.all(
      categoryTitles.map(async (title) => {
        const category = await categoryValidationService.getCategoryByTitle([title], userId)

        if (category.length === 0) {
          const newCategory = await categoryValidationService.createAfterCheck({ title }, userId)
          return newCategory.id
        }

        return category[0].id
      })
    )

    const recipeWithIds = { ...recipe, categoryId: categoryIds }

    const createdRecipe = await recipeRepository.createRecipe(recipeWithIds, userId)
    return createdRecipe
  }

  const updateRecipe = async (id: string, recipe: RecipeSchema, userId: string) => {
    const categoryTitles = recipe.categoryTitles

    const categoryIds = await Promise.all(
      categoryTitles.map(async (title) => {
        const category = await categoryValidationService.getCategoryByTitle([title], userId)

        if (category.length === 0) {
          const newCategory = await categoryValidationService.createAfterCheck({ title }, userId)
          return newCategory.id
        }

        return category[0].id
      })
    )

    const recipeWithIds = { ...recipe, categoryId: categoryIds }

    const foundRecipe = await recipeRepository.getRecipeById(id, userId)
    if (!foundRecipe) {
      throw new NotFoundError('Recept nenalezen')
    }

    return await recipeRepository.updateRecipe(id, recipeWithIds)
  }

  const deleteRecipe = async (id: string, userId: string) => {
    const foundRecipe = await recipeRepository.getRecipeById(id, userId)
    if (!foundRecipe) {
      throw new NotFoundError('Recept nenalezen')
    }
    return await recipeRepository.deleteRecipe(id)
  }

  return { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe }
}
