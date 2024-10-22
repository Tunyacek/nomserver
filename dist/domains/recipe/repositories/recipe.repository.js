'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.recipeRepositoryFactory = void 0
const prisma_1 = require('../../../lib/prisma')
const recipeRepositoryFactory = () => {
  const getAllRecipes = async () => {
    return await prisma_1.prisma.recipe.findMany({
      include: {
        categoryId: {
          include: {
            category: true,
          },
        },
        user: true,
      },
    })
  }
  const getRecipeById = async (id) => {
    return await prisma_1.prisma.recipe.findUnique({
      where: { id: id },
      include: {
        categoryId: {
          include: {
            category: true,
          },
        },
        user: true,
      },
    })
  }
  const createRecipe = async (recipe, userId) => {
    const { categoryId, portions, ...rest } = recipe
    const createdRecipe = await prisma_1.prisma.recipe.create({
      data: {
        ...rest,
        portions,
        user: {
          connect: { id: userId },
        },
        categoryId: {
          create: categoryId.map((id) => ({ category: { connect: { id } } })),
        },
      },
    })
    return createdRecipe
  }
  const updateRecipe = async (id, recipe, userId) => {
    const { categoryId, portions, ...rest } = recipe
    const updatedRecipe = await prisma_1.prisma.recipe.update({
      where: { id },
      data: {
        ...rest,
        portions,
        user: {
          connect: { id: userId },
        },
        categoryId: {
          set: [],
          create: categoryId.map((id) => ({ category: { connect: { id } } })),
        },
      },
    })
    return updatedRecipe
  }
  const deleteRecipe = async (id) => {
    await prisma_1.prisma.recipeCategory.deleteMany({
      where: {
        recipeId: id,
      },
    })
    await prisma_1.prisma.recipe.delete({
      where: { id },
    })
  }
  return {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  }
}
exports.recipeRepositoryFactory = recipeRepositoryFactory
