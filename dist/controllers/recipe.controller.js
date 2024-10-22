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
exports.recipeControlller = void 0
const recipe_services_1 = require('../services/recipe.services')

const getAllRecipes = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const allRecipes = recipe_services_1.recipeService.getAllRecipes()
    return res.json({ allRecipes })
  })
const getRecipeById = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const recipeResult = recipe_services_1.recipeService.getRecipeById(req.params.id)
    return res.json({ recipeResult })
  })
const createRecipe = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const createdRecipe = recipe_services_1.recipeService.createRecipe(req.body)
    return res.json({ createdRecipe })
  })
const updateRecipe = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const updatedRecipe = recipe_services_1.recipeService.updateRecipe(req.body)
    return res.json({ updatedRecipe })
  })
const deleteRecipe = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    yield recipe_services_1.recipeService.deleteRecipe(id)
    return res.json({ message: 'Recept úspěšně smazán.' })
  })
exports.recipeControlller = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
}
