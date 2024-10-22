'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.recipeControllerFactory = void 0
const errors_1 = require('../../../lib/errors')
const recipe_schema_1 = require('../schemas/recipe.schema')
const http_status_codes_1 = require('http-status-codes')
const jsonwebtoken_1 = require('jsonwebtoken')
require('dotenv/config')
const secretAccessKey = process.env.JWT_ACCESS_SECRET || 'pleasewritemeindotenv'
const recipeControllerFactory = (service) => {
  const getAllRecipes = async (req, res, _next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res
        .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
        .json({ message: 'Uživatel neautentikován.' })
    }
    const token = authHeader.split(' ')[1]
    try {
      const decoded = (0, jsonwebtoken_1.verify)(token, secretAccessKey)
      const userId = decoded.id
      if (!userId) {
        return res
          .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
          .json({ message: 'Uživatel neautentikován.' })
      }
      const userRecipes = await service.getAllRecipes(userId)
      return res.status(http_status_codes_1.StatusCodes.OK).json(userRecipes)
    } catch (err) {
      console.error('Authentication error:', err)
      return res
        .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
        .json({ message: 'Uživatel neautentikován.' })
    }
  }
  const getRecipeById = async (req, res, _next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res
        .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
        .json({ message: 'Uživatel neautentikován. 1' })
    }
    const token = authHeader.split(' ')[1]
    const decoded = (0, jsonwebtoken_1.verify)(token, secretAccessKey)
    const userId = decoded.id
    if (!userId) {
      return res
        .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
        .json({ message: 'Uživatel neautentikován. 2 ' })
    }
    const recipeResult = await service.getRecipeById(req.params.id, userId)
    return res.status(http_status_codes_1.StatusCodes.OK).json(recipeResult)
  }
  const createRecipe = async (req, res, _next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res
        .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
        .json({ message: 'Uživatel neautentikován.' })
    }
    const token = authHeader.split(' ')[1]
    const decoded = (0, jsonwebtoken_1.verify)(token, secretAccessKey)
    const userId = decoded.id
    if (!userId) {
      return res
        .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
        .json({ message: 'Uživatel neautentikován.' })
    }
    const parsedRecipe = recipe_schema_1.recipeSchema.safeParse({ ...req.body, userId })
    if (!parsedRecipe.success) {
      throw new errors_1.UnprocessableEntityError(parsedRecipe.error)
    }
    const createdRecipe = await service.createRecipe(parsedRecipe.data, userId)
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(createdRecipe)
  }
  const updateRecipe = async (req, res, _next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res
        .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
        .json({ message: 'Uživatel neautentikován.' })
    }
    const token = authHeader.split(' ')[1]
    const decoded = (0, jsonwebtoken_1.verify)(token, secretAccessKey)
    const userId = decoded.id
    if (!userId) {
      return res
        .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
        .json({ message: 'Uživatel neautentikován.' })
    }
    const parsedRecipe = recipe_schema_1.recipeSchema.safeParse({ ...req.body, userId })
    if (!parsedRecipe.success) {
      throw new errors_1.UnprocessableEntityError(parsedRecipe.error)
    }
    const updatedRecipe = await service.updateRecipe(req.params.id, parsedRecipe.data, userId)
    return res.status(http_status_codes_1.StatusCodes.OK).json(updatedRecipe)
  }
  const deleteRecipe = async (req, res, _next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res
        .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
        .json({ message: 'Uživatel neautentikován.' })
    }
    const token = authHeader.split(' ')[1]
    const decoded = (0, jsonwebtoken_1.verify)(token, secretAccessKey)
    const userId = decoded.id
    if (!userId) {
      return res
        .status(http_status_codes_1.StatusCodes.UNAUTHORIZED)
        .json({ message: 'Uživatel neautentikován.' })
    }
    await service.deleteRecipe(req.params.id, userId)
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
