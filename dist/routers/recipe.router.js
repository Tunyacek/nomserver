'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const recipe_controller_1 = require('../controllers/recipe.controller')
const recipeRouter = express_1.default.Router()
recipeRouter.get('/', recipe_controller_1.recipeControlller.getAllRecipes)
recipeRouter.get('/:id', recipe_controller_1.recipeControlller.getRecipeById)
recipeRouter.post('/', recipe_controller_1.recipeControlller.createRecipe)
recipeRouter.patch('/:id', recipe_controller_1.recipeControlller.updateRecipe)
recipeRouter.delete('/:id', recipe_controller_1.recipeControlller.deleteRecipe)
exports.default = recipeRouter
