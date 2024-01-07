import { z } from 'zod'

export const createProgramSchema = z.object({
  name: z.string().min(5, { message: 'Please enter a name' }),
  description: z.string().min(20, { message: 'Please enter a description' })
})
