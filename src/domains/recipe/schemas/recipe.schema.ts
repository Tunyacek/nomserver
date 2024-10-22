import { z } from 'zod'

const rating = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'] as const

export const recipeSchema = z.object({
  title: z.string(),
  summary: z.string(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  rating: z.enum(rating),
  categoryTitles: z.array(z.string()),
  userId: z.string(),
  image_url: z.string(),
  prep_time: z.number(),
  cook_time: z.number(),
  portions: z.number(),
})

export type RecipeSchema = z.infer<typeof recipeSchema>
