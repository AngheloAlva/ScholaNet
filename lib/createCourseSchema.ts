import { z } from 'zod'

export const createCourseSchema = z.object({
  title: z.string().min(2, { message: 'Please enter a title' }),
  description: z.string().min(20, { message: 'Please enter a description' }),
  program: z.string().optional(),
  image: z.string().url().optional(),
  href: z.string().min(5, { message: 'Please enter a href' })
})
