'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.recipeServiceFactory = void 0
const errors_1 = require('../../../lib/errors')
const recipeServiceFactory = (recipeRepository, categoryValidationService) => {
  const getAllRecipes = async (userId) => {
    return await recipeRepository.getAllRecipes(userId)
  }
  const getRecipeById = async (id, userId) => {
    const recipeResult = await recipeRepository.getRecipeById(id, userId)
    if (!recipeResult) {
      throw new errors_1.NotFoundError('Recept nenalezen')
    }
    return recipeResult
  }
  const createRecipe = async (recipe, userId) => {
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
  const updateRecipe = async (id, recipe, userId) => {
    const foundRecipe = await recipeRepository.getRecipeById(id, userId)
    if (!foundRecipe) {
      throw new errors_1.NotFoundError('Recept nenalezen')
    }
    return await recipeRepository.updateRecipe(id, recipe)
  }
  const deleteRecipe = async (id, userId) => {
    const foundRecipe = await recipeRepository.getRecipeById(id, userId)
    if (!foundRecipe) {
      throw new errors_1.NotFoundError('Recept nenalezen')
    }
    return await recipeRepository.deleteRecipe(id)
  }
  return { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe }
}
exports.recipeServiceFactory = recipeServiceFactory
