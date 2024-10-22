'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.imageRepositoryFactory = void 0
const storage_1 = require('../../../lib/storage')
const base64_arraybuffer_1 = require('base64-arraybuffer')
const imageRepositoryFactory = () => {
  const uploadImage = async (file, id) => {
    try {
      const fileBase64 = (0, base64_arraybuffer_1.decode)(file.buffer.toString('base64'))
      const fileExtension = file.originalname.split('.').pop()
      const fileName = `${id}.${fileExtension}`
      const { data, error } = await storage_1.supabase.storage
        .from('images')
        .upload(fileName, fileBase64, {
          contentType: file.mimetype,
        })
      if (error) {
        console.error('Supabase upload error:', error)
        throw error
      }
      const { data: publicUrlData } = storage_1.supabase.storage
        .from('images')
        .getPublicUrl(data.path)
      if (!publicUrlData || !publicUrlData.publicUrl) {
        console.error('Failed to retrieve public URL:', publicUrlData)
        throw new Error('Failed to retrieve public URL')
      }
      return { path: publicUrlData.publicUrl }
    } catch (err) {
      console.error('Error in uploadImage:', err)
      throw err
    }
  }
  return {
    uploadImage,
  }
}
exports.imageRepositoryFactory = imageRepositoryFactory
