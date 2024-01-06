import { z } from 'zod'

export const createQuestionSchema = z.object({
  questionText: z.string().min(2, { message: 'Please enter a question' }),
  options: z.array(z.string()).min(2, { message: 'Please enter at least two options' }),
  correctAnswer: z.string().min(1, { message: 'Please enter a correct answer' }),
  oints: z.number().min(1, { message: 'Please enter a point value' })
})
