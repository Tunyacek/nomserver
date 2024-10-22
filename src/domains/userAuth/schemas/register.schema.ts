import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string(),
  password: z.string(),
  username: z.string(),
})

export type RegisterSchema = z.infer<typeof registerSchema>
