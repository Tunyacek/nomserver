import { ImageRepository } from '../repositories/image.repository.interface'

export const imageServiceFactory = (repository: ImageRepository) => {
  const uploadImage = async (file: Express.Multer.File, id: string) => {
    return await repository.uploadImage(file, id)
  }

  return {
    uploadImage,
  }
}
