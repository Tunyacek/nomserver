'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.recipeControlller = void 0
const recipe_services_1 = require('../services/recipe.services')
const errors_1 = require('../lib/errors')
const errors_2 = require('../lib/errors')
const zod_1 = require('../zod')
const getAllRecipes = async (req, res, next) => {
  try {
    const allRecipes = await recipe_services_1.recipeService.getAllRecipes()
    if (!allRecipes) {
      throw new errors_1.NotFoundError('Recipes not found')
    }
    return res.json(allRecipes)
  } catch (err) {
    next(err)
  }
}
const getRecipeById = async (req, res, next) => {
  try {
    const recipeResult = await recipe_services_1.recipeService.getRecipeById(req.params.id)
    if (!recipeResult) {
      throw new errors_1.NotFoundError('Recipe not found')
    }
    return res.json(recipeResult)
  } catch (err) {
    next(err)
  }
}
const createRecipe = async (req, res, next) => {
  try {
    const parsedRecipe = zod_1.Recipe.parse(req.body)
    const id = req.params.id
    const createdRecipe = await recipe_services_1.recipeService.createRecipe({ id, parsedRecipe })
    if (!createdRecipe) {
      throw new errors_2.UnprocessableEntity('Unprocessable Entity')
    }
    return res.json(createdRecipe)
  } catch (err) {
    next(err)
  }
}
const updateRecipe = async (req, res, next) => {
  try {
    const parsedRecipe = zod_1.Recipe.parse(req.body)
    const id = req.params.id
    const updatedRecipe = await recipe_services_1.recipeService.updateRecipe({ id, parsedRecipe })
    if (!updatedRecipe) {
      throw new errors_2.UnprocessableEntity('Unprocessable Entity')
    }
    return res.json(updatedRecipe)
  } catch (err) {
    next(err)
  }
}
const deleteRecipe = async (req, res, next) => {
  const id = req.params.id
  try {
    const foundRecipe = await recipe_services_1.recipeService.getRecipeById(id)
    if (!foundRecipe) {
      throw new errors_1.NotFoundError('Recipe not found')
    }
    await recipe_services_1.recipeService.deleteRecipe(id)
    return res.json({ message: 'Recept úspěšně smazán.' })
  } catch (err) {
    next(err)
  }
}
exports.recipeControlller = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
}
