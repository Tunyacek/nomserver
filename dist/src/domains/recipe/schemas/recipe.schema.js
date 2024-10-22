'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.recipeSchema = void 0
const zod_1 = require('zod')
const rating = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']
exports.recipeSchema = zod_1.z.object({
  title: zod_1.z.string(),
  summary: zod_1.z.string(),
  ingredients: zod_1.z.array(zod_1.z.string()),
  instructions: zod_1.z.array(zod_1.z.string()),
  rating: zod_1.z.enum(rating),
  categoryTitles: zod_1.z.array(zod_1.z.string()),
  userId: zod_1.z.string(),
  image_url: zod_1.z.string(),
  prep_time: zod_1.z.number(),
  cook_time: zod_1.z.number(),
  portions: zod_1.z.number(),
})
