import { categoryRepositoryFactory } from '../category/repositories/category.repository'
import { categoryValidationServiceFactory } from './services/shared.services'

const categoryRepository = categoryRepositoryFactory()
const categoryValidationService = categoryValidationServiceFactory(categoryRepository)

export { categoryRepository, categoryValidationService }
