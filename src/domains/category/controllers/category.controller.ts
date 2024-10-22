import { Request, Response, NextFunction } from 'express'
import { UnprocessableEntityError } from '../../../lib/errors'
import { CategoryService } from '../services/category.services.interface'
import { StatusCodes } from 'http-status-codes'
import { ExpressControllerFn } from '../../../lib/utils'
import { categorySchema } from '../schemas/category.schema'
import 'dotenv/config'
import { verify } from 'jsonwebtoken'

type CategoryControllerFactory = (service: CategoryService) => {
  getAllCategories: ExpressControllerFn
  getCategoryById: ExpressControllerFn
  createCategory: ExpressControllerFn
}

const secretAccessKey = process.env.JWT_ACCESS_SECRET || 'pleasewritemeindotenv'

export const categoryControllerFactory: CategoryControllerFactory = (service: CategoryService) => {
  const getAllCategories = async (req: Request, res: Response, _next: NextFunction) => {
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

    const allCategories = await service.getAllCategories(userId)
    return res.status(StatusCodes.OK).json(allCategories)
  }

  const getCategoryById = async (req: Request, res: Response, _next: NextFunction) => {
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

    const categoryResult = await service.getCategoryById([req.params.id], userId)
    return res.status(StatusCodes.OK).json(categoryResult)
  }

  const createCategory = async (req: Request, res: Response, _next: NextFunction) => {
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

    const parsedCategory = categorySchema.safeParse({ ...req.body, userId })
    if (!parsedCategory.success) {
      throw new UnprocessableEntityError(parsedCategory.error)
    }
    const createdCategory = await service.createCategory(parsedCategory.data, userId)
    return res.status(StatusCodes.CREATED).json(createdCategory)
  }

  return {
    getAllCategories,
    getCategoryById,
    createCategory,
  }
}
