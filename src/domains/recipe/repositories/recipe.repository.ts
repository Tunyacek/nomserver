import { prisma } from '../../../lib/prisma'
import { RecipeSchema } from '../schemas/recipe.schema'

export const recipeRepositoryFactory = () => {
  const sanitizeRecipeResponse = (recipe: any) => {
    return {
      ...recipe,
      user: {
        id: recipe.user.id,
        username: recipe.user.username,
      },

      categoryId: recipe.categoryId.map((category: any) => ({
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

  const getAllRecipes = async (userId: string) => {
    const recipes = await prisma.recipe.findMany({
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

  const getRecipeById = async (id: string, userId: string) => {
    const recipe = await prisma.recipe.findFirst({
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

  const createRecipe = async (recipe: RecipeSchema) => {
    const { categoryTitles, portions, userId, ...rest } = recipe

    const categoryIds = await Promise.all(
      categoryTitles.map(async (title) => {
        const categories = await prisma.category.findMany({
          where: { title, userId },
        })
        return categories.length > 0 ? categories[0].id : null
      })
    )

    const validCategoryIds = categoryIds.filter((id): id is string => id !== null)

    const createdRecipe = await prisma.recipe.create({
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

  const updateRecipe = async (id: string, recipe: RecipeSchema) => {
    const { categoryTitles, portions, userId, ...rest } = recipe

    const categoryIds = await Promise.all(
      categoryTitles.map(async (title) => {
        const categories = await prisma.category.findMany({
          where: { title, userId },
        })
        return categories.length > 0 ? categories[0].id : null
      })
    )

    const validCategoryIds = categoryIds.filter((id): id is string => id !== null)

    const updatedRecipe = await prisma.recipe.update({
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

  const deleteRecipe = async (id: string) => {
    await prisma.recipeCategory.deleteMany({
      where: {
        recipeId: id,
      },
    })

    await prisma.recipe.delete({
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
