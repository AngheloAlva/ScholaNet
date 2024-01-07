import { z } from 'zod'

export const createCourseInstanceSchema = z.object({
  course: z.string().min(10, { message: 'Please enter a course' }),
  teacher: z.string().min(10, { message: 'Please enter a teacher' }),
  semester: z.string().min(10, { message: 'Please enter a semester' }),
  academicYear: z.string().min(4, { message: 'Please enter a academicYear' }),
  classroom: z.string().min(10, { message: 'Please enter a classroom' })
})
