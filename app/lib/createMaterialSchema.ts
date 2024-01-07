import { z } from 'zod'

export const createMaterialSchema = z.object({
  title: z.string().min(2, { message: 'Please enter a title' }),
  description: z.string().min(2, { message: 'Please enter a description' })
})
