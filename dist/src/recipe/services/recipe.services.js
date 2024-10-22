'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.recipeService = void 0
const recipeService = (recipeRepository) => {
  const getAllRecipes = async () => {
    return await recipeRepository.getAllRecipes()
  }
  const getRecipeById = async (id) => {
    return await recipeRepository.getRecipeById(id)
  }
  const createRecipe = async (recipe) => {
    return await recipeRepository.createRecipe(recipe)
  }
  const updateRecipe = async (id, recipe) => {
    return await recipeRepository.updateRecipe(id, recipe)
  }
  const deleteRecipe = async (id) => {
    return await recipeRepository.deleteRecipe(id)
  }
  return { getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe }
}
exports.recipeService = recipeService
