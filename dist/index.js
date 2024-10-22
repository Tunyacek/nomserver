'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const middleware_1 = require('./middleware')
const recipe_module_1 = require('./domains/recipe/recipe.module')
const category_module_1 = require('./domains/category/category.module')
const image_module_1 = require('./domains/image/image.module')
const register_module_1 = require('./domains/userAuth/modules/register.module')
const login_module_1 = require('./domains/userAuth/modules/login.module')
const user_module_1 = require('./domains/userAuth/modules/user.module')
require('dotenv/config')
const cors_1 = __importDefault(require('cors'))
const cookie_parser_1 = __importDefault(require('cookie-parser'))
const app = (0, express_1.default)()
const port = process.env.PORT || 3000
const recipeAPI = (0, recipe_module_1.recipeModule)()
const categoryAPI = (0, category_module_1.categoryModule)()
const imageAPI = (0, image_module_1.imageModule)()
const registerAPI = (0, register_module_1.registerModule)()
const loginAPI = (0, login_module_1.loginModule)()
const userAPI = (0, user_module_1.authenticatedUserModule)()
app.use(express_1.default.json())
app.use((0, cookie_parser_1.default)())
app.use((0, cors_1.default)({ origin: process.env.FE_URL }))
;(async () => {
  app.use('/images', await imageAPI)
})()
app.use('/recipes', recipeAPI)
app.use('/categories', categoryAPI)
app.use('/register', registerAPI)
app.use('/login', loginAPI)
app.use('/authentication', userAPI)
app.use(middleware_1.errorHandler)
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
