'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.recipeModule = void 0
const recipe_services_1 = require('./services/recipe.services')
const recipe_repository_1 = require('./repositories/recipe.repository')
const recipe_controller_1 = require('./controllers/recipe.controller')
const recipe_router_1 = require('./routers/recipe.router')
const shared_module_1 = require('../shared/shared.module')
const recipeModule = () => {
  const recipeRepository = (0, recipe_repository_1.recipeRepositoryFactory)()
  const service = (0, recipe_services_1.recipeServiceFactory)(
    recipeRepository,
    shared_module_1.categoryValidationService
  )
  const controller = (0, recipe_controller_1.recipeControllerFactory)(service)
  const router = (0, recipe_router_1.recipeRouterFactory)(controller)
  return router
}
exports.recipeModule = recipeModule
