import { z } from 'zod'

export const createEvaluationSchema = z.object({
  title: z.string().min(2, { message: 'Please enter a title' }),
  description: z.string().min(20, { message: 'Please enter a description' }),
  dueDate: z.date().min(new Date(), { message: 'Please enter a valid date' }),
  type: z.string().min(2, { message: 'Please enter a type' })
})
