import type { Semester } from '../schola-net/semester'
import type { User } from '../user/user'
import type { Course } from './course'

export interface CourseInstance {
  _id: string
  course: Course
  teacher: User
  students: string[]
  semester: Semester
  academicYear: string
  classroom: string
  schedule: Array<{
    day: string
    startTime: string
    endTime: string
  }>
}

export interface CreateCourseInstance {
  course: string
  teacher: string
  semester: string
  academicYear: number
  classroom: string
  schedule: Array<{
    day: string
    startTime: string
    endTime: string
  }>
}

export interface UpdateCourseInstance {
  id: string
  teacher?: User
  classroom?: string
  schedule?: Array<{
    day?: string
    startTime?: string
    endTime?: string
  }>
}
