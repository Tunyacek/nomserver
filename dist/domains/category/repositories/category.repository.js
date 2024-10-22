'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.categoryRepositoryFactory = void 0
const prisma_1 = require('../../../lib/prisma')
const categoryRepositoryFactory = () => {
  const getAllCategories = async () => {
    return await prisma_1.prisma.category.findMany()
  }
  const getCategoryById = async (ids) => {
    return await prisma_1.prisma.category.findMany({ where: { id: { in: ids } } })
  }
  const createCategory = async (category) => {
    const createdCategory = await prisma_1.prisma.category.create({
      data: { ...category },
    })
    return createdCategory
  }
  return {
    getAllCategories,
    getCategoryById,
    createCategory,
  }
}
exports.categoryRepositoryFactory = categoryRepositoryFactory
