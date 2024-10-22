'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.imageServiceFactory = void 0
const imageServiceFactory = (repository) => {
  const uploadImage = async (file, id) => {
    return await repository.uploadImage(file, id)
  }
  return {
    uploadImage,
  }
}
exports.imageServiceFactory = imageServiceFactory
