import { z } from 'zod'

export const dayOptions = z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'])
export const startTimes = z.enum(['8:30', '9:15', '10:00', '10:45', '11:30', '12:15', '13:00', '13:45', '14:30', '15:15'])
export const durationnOptions = z.enum(['1', '2', '3'])

export const createCourseInstanceSchema = z.object({
  course: z.string().min(10, { message: 'Please enter a course' }),
  teacher: z.string().min(10, { message: 'Please enter a teacher' }),
  semester: z.string().min(10, { message: 'Please enter a semester' }),
  academicYear: z.string().min(4, { message: 'Please enter a academicYear' }),
  classroom: z.string().min(10, { message: 'Please enter a classroom' }),
  schedule: z.array(z.object({
    day: z.string().min(1, 'Please enter a day'),
    startTime: z.string().min(1, 'Please enter a startTime'),
    duration: z.string().min(1, 'Please enter a duration')
  }))
})
