'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.categoryValidationService = exports.categoryRepository = void 0
const category_repository_1 = require('../category/repositories/category.repository')
const shared_services_1 = require('./services/shared.services')
const categoryRepository = (0, category_repository_1.categoryRepositoryFactory)()
exports.categoryRepository = categoryRepository
const categoryValidationService = (0, shared_services_1.categoryValidationServiceFactory)(
  categoryRepository
)
exports.categoryValidationService = categoryValidationService
