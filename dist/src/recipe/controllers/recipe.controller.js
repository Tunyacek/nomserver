'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.recipeControllerFactory = void 0
const errors_1 = require('../../lib/errors')
const errors_2 = require('../../lib/errors')
const recipe_schema_1 = require('../../schemas/recipe.schema')
const http_status_codes_1 = require('http-status-codes')
const recipeControllerFactory = (service) => {
  const getAllRecipes = async (_req, res, _next) => {
    const allRecipes = await service.getAllRecipes()
    return res.status(http_status_codes_1.StatusCodes.OK).json(allRecipes)
  }
  const getRecipeById = async (req, res, _next) => {
    const recipeResult = await service.getRecipeById(req.params.id)
    if (!recipeResult) {
      throw new errors_1.NotFoundError('Recipe not found')
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json(recipeResult)
  }
  const createRecipe = async (req, res, _next) => {
    const parsedRecipe = recipe_schema_1.recipeSchema.safeParse(req.body)
    if (!parsedRecipe.success) {
      throw new errors_2.UnprocessableEntity('Unprocessable Entity')
    }
    const createdRecipe = await service.createRecipe(req.body)
    if (!createdRecipe) {
      throw new errors_2.UnprocessableEntity('Unprocessable Entity')
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json(createdRecipe)
  }
  const updateRecipe = async (req, res, _next) => {
    const parsedRecipe = recipe_schema_1.recipeSchema.safeParse(req.body)
    if (!parsedRecipe.success) {
      throw new errors_2.UnprocessableEntity('Unprocessable Entity')
    }
    const id = req.params.id
    const updatedRecipe = await service.updateRecipe(id, req.body)
    if (!updatedRecipe) {
      throw new errors_2.UnprocessableEntity('Unprocessable Entity')
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json(updatedRecipe)
  }
  const deleteRecipe = async (req, res, _next) => {
    const id = req.params.id
    const foundRecipe = await service.getRecipeById(id)
    if (!foundRecipe) {
      throw new errors_1.NotFoundError('Recipe not found')
    }
    await service.deleteRecipe(id)
    return res
      .status(http_status_codes_1.StatusCodes.OK)
      .json({ message: 'Recept úspěšně smazán.' })
  }
  return {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  }
}
exports.recipeControllerFactory = recipeControllerFactory
