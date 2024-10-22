'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.recipeModule = void 0
const recipe_services_1 = require('../recipe/services/recipe.services')
const recipe_repository_1 = require('../recipe/repositories/recipe.repository')
const recipe_controller_1 = require('../recipe/controllers/recipe.controller')
const recipe_router_1 = require('../routers/recipe.router')
const recipeModule = () => {
  const repository = (0, recipe_repository_1.recipeRepository)()
  const service = (0, recipe_services_1.recipeService)(repository)
  const controller = (0, recipe_controller_1.recipeControllerFactory)(service)
  const router = (0, recipe_router_1.recipeRouterFactory)(controller)
  return router
}
exports.recipeModule = recipeModule
