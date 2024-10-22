import { supabase } from '../../../lib/storage'
import { decode } from 'base64-arraybuffer'

export const imageRepositoryFactory = () => {
  const uploadImage = async (file: Express.Multer.File, id: string): Promise<{ path: string }> => {
    try {
      const fileBase64 = decode(file.buffer.toString('base64'))
      const fileExtension = file.originalname.split('.').pop()
      const fileName = `${id}.${fileExtension}`

      const { data, error } = await supabase.storage.from('images').upload(fileName, fileBase64, {
        contentType: file.mimetype,
      })

      if (error) {
        console.error('Supabase upload error:', error)
        throw error
      }

      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(data.path)

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
