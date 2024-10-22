export interface ImageRepository {
  uploadImage: (file: Express.Multer.File, id: string) => Promise<{ path: string }>
}
