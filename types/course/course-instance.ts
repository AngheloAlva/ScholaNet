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
  schedule: string
}

export interface CreateCourseInstance {
  course: string
  teacher: string
  semester: string
  academicYear: number
  classroom: string
}

export interface UpdateCourseInstance {
  id: string
  teacher?: string
  classroom?: string
}
