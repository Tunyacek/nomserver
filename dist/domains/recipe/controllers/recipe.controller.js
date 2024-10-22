'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.recipeControllerFactory = void 0
const errors_1 = require('../../../lib/errors')
const recipe_schema_1 = require('../schemas/recipe.schema')
const http_status_codes_1 = require('http-status-codes')
const recipeControllerFactory = (service) => {
  const getAllRecipes = async (_req, res, _next) => {
    const allRecipes = await service.getAllRecipes()
    return res.status(http_status_codes_1.StatusCodes.OK).json(allRecipes)
  }
  const getRecipeById = async (req, res, _next) => {
    const recipeResult = await service.getRecipeById(req.params.id)
    return res.status(http_status_codes_1.StatusCodes.OK).json(recipeResult)
  }
  const createRecipe = async (req, res, _next) => {
    console.log(res)
    const parsedRecipe = recipe_schema_1.recipeSchema.safeParse(req.body)
    if (!parsedRecipe.success) {
      throw new errors_1.UnprocessableEntityError(parsedRecipe.error)
    }
    const createdRecipe = await service.createRecipe(req.body, '1')
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(createdRecipe)
  }
  const updateRecipe = async (req, res, _next) => {
    const parsedRecipe = recipe_schema_1.recipeSchema.safeParse(req.body)
    if (!parsedRecipe.success) {
      throw new errors_1.UnprocessableEntityError(parsedRecipe.error)
    }
    const id = req.params.id
    /* const userId = req.user?.id
        if (!userId) {
          return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not authenticated.' })
        } */
    const updatedRecipe = await service.updateRecipe(id, req.body, '1')
    return res.status(http_status_codes_1.StatusCodes.OK).json(updatedRecipe)
  }
  const deleteRecipe = async (req, res, _next) => {
    const id = req.params.id
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
