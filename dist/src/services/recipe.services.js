'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.recipeService = void 0
const recipe_repository_1 = require('../repositories/recipe.repository')
const getAllRecipes = async () => {
  return await recipe_repository_1.recipeRepository.getAllRecipes()
}
const getRecipeById = async (id) => {
  return await recipe_repository_1.recipeRepository.getRecipeById(id)
}
const createRecipe = async (recipe) => {
  return await recipe_repository_1.recipeRepository.createRecipe(recipe)
}
const updateRecipe = async (recipe) => {
  return await recipe_repository_1.recipeRepository.updateRecipe(recipe)
}
const deleteRecipe = async (id) => {
  return await recipe_repository_1.recipeRepository.deleteRecipe(id)
}
exports.recipeService = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
}
