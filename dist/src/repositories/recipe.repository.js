'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.recipeRepository = void 0
const prisma_1 = require('../lib/prisma')
const getAllRecipes = async () => {
  const allRecipes = await prisma_1.prisma.recipe.findMany()
  return allRecipes
}
const getRecipeById = async (id) => {
  const recipeById = await prisma_1.prisma.recipe.findUnique({ where: { id: id } })
  return recipeById
}
const createRecipe = async (recipe) => {
  const { title, summary, ingredients, instructions, rating, image_url, prep_time, cook_time } =
    recipe
  const createdRecipe = await prisma_1.prisma.recipe.create({
    data: {
      title,
      summary,
      ingredients,
      instructions,
      rating,
      image_url,
      prep_time,
      cook_time,
    },
  })
  return createdRecipe
}
const updateRecipe = async (recipe) => {
  const { id, title, summary, ingredients, instructions, rating, image_url, prep_time, cook_time } =
    recipe
  const updatedRecipe = await prisma_1.prisma.recipe.update({
    where: {
      id: id,
    },
    data: {
      title,
      summary,
      ingredients,
      instructions,
      rating,
      image_url,
      prep_time,
      cook_time,
    },
  })
  return updatedRecipe
}
const deleteRecipe = async (id) => {
  await prisma_1.prisma.recipe.delete({ where: { id: id } })
}
exports.recipeRepository = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
}
