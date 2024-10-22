export interface ImageService {
  uploadImage: (file: Express.Multer.File, id: string) => Promise<{ path: string }>
}
