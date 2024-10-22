'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.recipeServiceFactory = void 0
const errors_1 = require('../../../lib/errors')
const recipeServiceFactory = (recipeRepository, categoryValidationService) => {
  const getAllRecipes = async () => {
    return await recipeRepository.getAllRecipes()
  }
  const getRecipeById = async (id) => {
    const recipeResult = await recipeRepository.getRecipeById(id)
    if (!recipeResult) {
      throw new errors_1.NotFoundError('Recept nenalezen')
    }
    return recipeResult
  }
  const createRecipe = async (recipe, userId) => {
    const categoryExists = await categoryValidationService.categoryExists(recipe.categoryId)
    if (!categoryExists) {
      throw new errors_1.UnprocessableEntityError('Kategorie neexistuje')
    }
    const createdRecipe = await recipeRepository.createRecipe(recipe, userId)
    return createdRecipe
  }
  const updateRecipe = async (id, recipe, userId) => {
    const foundRecipe = await recipeRepository.getRecipeById(id)
    if (!foundRecipe) {
      throw new errors_1.NotFoundError('Recept nenalezen')
    }
    return await recipeRepository.updateRecipe(id, recipe, userId)
  }
  const deleteRecipe = async (id) => {
    const foundRecipe = await recipeRepository.getRecipeById(id)
    if (!foundRecipe) {
      throw new errors_1.NotFoundError('Recept nenalezen')
    }
    return await recipeRepository.deleteRecipe(id)
  }
  return { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe }
}
exports.recipeServiceFactory = recipeServiceFactory
