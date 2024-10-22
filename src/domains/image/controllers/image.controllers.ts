import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ImageService } from '../services/image.services.interface'
import { ExpressControllerFn } from '../../../lib/utils'
import { v4 as uuidv4 } from 'uuid'

type imageControllerFactory = (service: ImageService) => {
  uploadImage: ExpressControllerFn
}

export const imageControllerFactory: imageControllerFactory = (service: ImageService) => {
  const uploadImage = async (req: Request, res: Response, _next: NextFunction) => {
    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'No file uploaded' })
    }

    const file = req.file
    const id = uuidv4()
    const uploadedImage = await service.uploadImage(file, id)
    return res.status(StatusCodes.CREATED).json(uploadedImage)
  }

  return {
    uploadImage,
  }
}
