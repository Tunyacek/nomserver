'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.recipeRouterFactory = exports.recipeRouter = void 0
const express_1 = __importDefault(require('express'))
const utils_1 = require('../lib/utils')
exports.recipeRouter = express_1.default.Router()
const recipeRouterFactory = (controller) => {
  const recipeRouter = express_1.default.Router()
  // asyncHandler wrapper is a workaround to directly pass thrown errors into the error middleware
  // Without it thrown errors were not cauught by the global error middleware
  recipeRouter.get('/', (0, utils_1.asyncHandler)(controller.getAllRecipes))
  recipeRouter.get('/:id', (0, utils_1.asyncHandler)(controller.getRecipeById))
  recipeRouter.post('/', (0, utils_1.asyncHandler)(controller.createRecipe))
  recipeRouter.put('/:id', (0, utils_1.asyncHandler)(controller.updateRecipe))
  recipeRouter.delete('/:id', (0, utils_1.asyncHandler)(controller.deleteRecipe))
  return recipeRouter
}
exports.recipeRouterFactory = recipeRouterFactory
