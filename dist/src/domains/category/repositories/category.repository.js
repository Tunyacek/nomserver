'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.categoryRepositoryFactory = void 0
const prisma_1 = require('../../../lib/prisma')
const categoryRepositoryFactory = () => {
  const getAllCategories = async (userId) => {
    const categories = await prisma_1.prisma.category.findMany({
      where: { userId },
    })
    return categories || []
  }
  const getCategoryByTitle = async (titles, userId) => {
    return await prisma_1.prisma.category.findMany({
      where: { title: { in: titles }, userId: userId },
    })
  }
  const getCategoryById = async (id, userId) => {
    return await prisma_1.prisma.category.findMany({ where: { id: { in: id }, userId: userId } })
  }
  const createCategory = async (category, userId) => {
    const existingCategory = await prisma_1.prisma.category.findFirst({
      where: {
        title: category.title,
        userId: userId,
      },
    })
    if (existingCategory) {
      return existingCategory
    }
    const createdCategory = await prisma_1.prisma.category.create({
      data: {
        ...category,
        userId: userId,
      },
    })
    return createdCategory
  }
  return {
    getCategoryById,
    getAllCategories,
    getCategoryByTitle,
    createCategory,
  }
}
exports.categoryRepositoryFactory = categoryRepositoryFactory
