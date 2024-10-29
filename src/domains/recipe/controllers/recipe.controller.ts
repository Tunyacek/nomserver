import { Request, Response, NextFunction } from 'express'
import { UnprocessableEntityError } from '../../../lib/errors'
import { recipeSchema } from '../schemas/recipe.schema'
import { RecipeService } from '../services/recipe.services.interface'
import { StatusCodes } from 'http-status-codes'
import { ExpressControllerFn } from '../../../lib/utils'
import { verify } from 'jsonwebtoken'
import 'dotenv/config'

type RecipeControllerFactory = (service: RecipeService) => {
  getAllRecipes: ExpressControllerFn
  getRecipeById: ExpressControllerFn
  createRecipe: ExpressControllerFn
  updateRecipe: ExpressControllerFn
  deleteRecipe: ExpressControllerFn
}

const secretAccessKey = process.env.JWT_ACCESS_SECRET || 'pleasewritemeindotenv'

export const recipeControllerFactory: RecipeControllerFactory = (service: RecipeService) => {
  const getAllRecipes = async (req: Request, res: Response, _next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Uživatel neautentikován.' })
    }

    const token = authHeader.split(' ')[1]

    try {
      const decoded = verify(token, secretAccessKey) as { id: string }
      const userId = decoded.id
      if (!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Uživatel neautentikován.' })
      }

      const userRecipes = await service.getAllRecipes(userId)
      return res.status(StatusCodes.OK).json(userRecipes)
    } catch (err) {
      console.error('Authentication error:', err)
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Uživatel neautentikován.' })
    }
  }

  const getRecipeById = async (req: Request, res: Response, _next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Uživatel neautentikován.' })
    }

    const token = authHeader.split(' ')[1]

    const decoded = verify(token, secretAccessKey) as { id: string }

    const userId = decoded.id
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Uživatel neautentikován.' })
    }

    const recipeResult = await service.getRecipeById(req.params.id, userId)
    return res.status(StatusCodes.OK).json(recipeResult)
  }

  const createRecipe = async (req: Request, res: Response, _next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Uživatel neautentikován.' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = verify(token, secretAccessKey) as { id: string }

    const userId = decoded.id
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Uživatel neautentikován.' })
    }

    const parsedRecipe = recipeSchema.safeParse({ ...req.body, userId })
    if (!parsedRecipe.success) {
      throw new UnprocessableEntityError(parsedRecipe.error)
    }

    const createdRecipe = await service.createRecipe(parsedRecipe.data, userId)
    return res.status(StatusCodes.CREATED).json(createdRecipe)
  }

  const updateRecipe = async (req: Request, res: Response, _next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Uživatel neautentikován.' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = verify(token, secretAccessKey) as { id: string }

    const userId = decoded.id
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Uživatel neautentikován.' })
    }

    const parsedRecipe = recipeSchema.safeParse({ ...req.body, userId })
    if (!parsedRecipe.success) {
      throw new UnprocessableEntityError(parsedRecipe.error)
    }

    const updatedRecipe = await service.updateRecipe(req.params.id, parsedRecipe.data, userId)
    return res.status(StatusCodes.OK).json(updatedRecipe)
  }

  const deleteRecipe = async (req: Request, res: Response, _next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Uživatel neautentikován.' })
    }

    const token = authHeader.split(' ')[1]

    const decoded = verify(token, secretAccessKey) as { id: string }

    const userId = decoded.id
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Uživatel neautentikován.' })
    }

    await service.deleteRecipe(req.params.id, userId)
    return res.status(StatusCodes.OK).json({ message: 'Recept úspěšně smazán.' })
  }

  return {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  }
}
