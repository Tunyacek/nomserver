'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Recipe = void 0
const zod_1 = require('zod')
exports.Recipe = zod_1.z.object({
  id: zod_1.z.string(),
  title: zod_1.z.string(),
  summary: zod_1.z.string(),
  ingredients: zod_1.z.string(),
  instructions: zod_1.z.string(),
  rating: zod_1.z.number(),
  image_url: zod_1.z.string(),
  prep_time: zod_1.z.string(),
  cook_time: zod_1.z.string(),
})
