'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.recipeRepositoryFactory = void 0
const prisma_1 = require('../../../lib/prisma')
const recipeRepositoryFactory = () => {
  const sanitizeRecipeResponse = (recipe) => {
    return {
      ...recipe,
      user: {
        id: recipe.user.id,
        username: recipe.user.username,
      },
      categoryId: recipe.categoryId.map((category) => ({
        ...category,
        category: {
          id: category.category.id,
          title: category.category.title,
          created_at: category.category.created_at,
          updated_at: category.category.updated_at,
        },
      })),
    }
  }
  const getAllRecipes = async (userId) => {
    const recipes = await prisma_1.prisma.recipe.findMany({
      where: { userId },
      include: {
        categoryId: {
          include: {
            category: true,
          },
        },
        user: true,
      },
    })
    return recipes.map(sanitizeRecipeResponse)
  }
  const getRecipeById = async (id, userId) => {
    const recipe = await prisma_1.prisma.recipe.findFirst({
      where: {
        id: id,
        userId: userId,
      },
      include: {
        categoryId: {
          include: {
            category: true,
          },
        },
        user: true,
      },
    })
    if (recipe) {
      return sanitizeRecipeResponse(recipe)
    } else {
      return null
    }
  }
  const createRecipe = async (recipe) => {
    const { categoryTitles, portions, userId, ...rest } = recipe
    const categoryIds = await Promise.all(
      categoryTitles.map(async (title) => {
        const categories = await prisma_1.prisma.category.findMany({
          where: { title, userId },
        })
        return categories.length > 0 ? categories[0].id : null
      })
    )
    const validCategoryIds = categoryIds.filter((id) => id !== null)
    const createdRecipe = await prisma_1.prisma.recipe.create({
      data: {
        ...rest,
        portions,
        user: {
          connect: { id: userId },
        },
        categoryId: {
          create: validCategoryIds.map((id) => ({
            category: { connect: { id } },
          })),
        },
      },
    })
    return createdRecipe
  }
  const updateRecipe = async (id, recipe) => {
    const { categoryTitles, portions, userId, ...rest } = recipe
    const categoryIds = await Promise.all(
      categoryTitles.map(async (title) => {
        const categories = await prisma_1.prisma.category.findMany({
          where: { title, userId },
        })
        return categories.length > 0 ? categories[0].id : null
      })
    )
    const validCategoryIds = categoryIds.filter((id) => id !== null)
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
          create: validCategoryIds.map((id) => ({
            category: { connect: { id } },
          })),
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
