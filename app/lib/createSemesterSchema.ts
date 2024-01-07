import { z } from 'zod'

export const createSemesterSchema = z.object({
  name: z.string().min(2, { message: 'Please enter a name' }),
  startDate: z.date({ required_error: 'Please enter a start date' }),
  endDate: z.date({ required_error: 'Please enter an end date' })
})
