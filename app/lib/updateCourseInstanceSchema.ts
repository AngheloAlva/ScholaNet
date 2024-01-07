import { z } from 'zod'

export const updateCourseInstanceSchema = z.object({
  course: z.string().optional(),
  teacher: z.string().optional(),
  semester: z.string().optional(),
  academicYear: z.string().optional(),
  classroom: z.string().optional(),
  schedule: z.array(z.object({
    day: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    duration: z.number()
  })).optional()
})
