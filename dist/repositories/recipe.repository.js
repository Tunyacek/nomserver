'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.recipeRepository = void 0
const prisma_1 = require('../lib/prisma')
const getAllRecipes = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const allRecipes = yield prisma_1.prisma.recipe.findMany()
    return allRecipes
  })
const getRecipeById = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const recipeById = yield prisma_1.prisma.recipe.findUnique({ where: { id: id } })
    return recipeById
  })
const createRecipe = (req) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { title, summary, ingredients, instructions, rating, image_url, prep_time, cook_time } =
      req.body
    const createdRecipe = yield prisma_1.prisma.recipe.create({
      data: {
        title,
        summary,
        ingredients,
        instructions,
        rating,
        image_url,
        prep_time,
        cook_time,
      },
    })
    return createdRecipe
  })
const updateRecipe = (req) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { title, summary, ingredients, instructions, rating, image_url, prep_time, cook_time } =
      req.body
    const updatedRecipe = yield prisma_1.prisma.recipe.update({
      where: {
        id: req.body.params,
      },
      data: {
        title,
        summary,
        ingredients,
        instructions,
        rating,
        image_url,
        prep_time,
        cook_time,
      },
    })
    return updatedRecipe
  })
const deleteRecipe = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.recipe.delete({ where: { id: id } })
  })
exports.recipeRepository = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
}
