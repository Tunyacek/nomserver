'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.imageControllerFactory = void 0
const http_status_codes_1 = require('http-status-codes')
const uuid_1 = require('uuid')
const imageControllerFactory = (service) => {
  const uploadImage = async (req, res, _next) => {
    if (!req.file) {
      return res
        .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
        .json({ message: 'No file uploaded' })
    }
    const file = req.file
    const id = (0, uuid_1.v4)()
    const uploadedImage = await service.uploadImage(file, id)
    return res.status(http_status_codes_1.StatusCodes.CREATED).json(uploadedImage)
  }
  return {
    uploadImage,
  }
}
exports.imageControllerFactory = imageControllerFactory
