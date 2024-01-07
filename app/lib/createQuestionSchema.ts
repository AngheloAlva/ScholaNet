import { z } from 'zod'

export const questionSchema = z.object({
  questionText: z.string().min(2, { message: 'Please enter a question' }),
  options: z.array(z.string()).min(1, { message: 'Please enter at least two options' }),
  correctAnswer: z.string().min(1, { message: 'Please enter a correct answer' }),
  points: z.string().min(1, { message: 'Please enter a number greater than 0' }),
  questionType: z.enum(['multipleChoice', 'trueFalse', 'shortAnswer'])
})

export const createQuestionSchema = z.object({
  questions: z.array(questionSchema)
})
