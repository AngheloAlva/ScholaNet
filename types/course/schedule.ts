import type { CourseInstance } from './course-instance'
import type { Student } from '../student/student'

export interface Schedule {
  _id: string
  name: string
  days: Array<{
    day: string
    blocks: Array<{
      startTime: string
      endTime: string
      courseInstance: string
      assignedStudents: Student[]
    }>
  }>
}

export interface CreateSchedule {
  name: string
  days: Array<{
    day: string
    blocks: Array<{
      startTime: string
      endTime: string
      courseInstance: string
      assignedStudents: string[]
    }>
  }>
}

export interface SimpleSchedule {
  startTime: string
  endTime: string
  courseInstance: {
    attendances: string[]
    evaluations: string[]
    _id: string
    course: string
    teacher: string
    students: string[]
    semester: string
    academicYear: 2024
    classroom: string
    schedule: string
  }
  assignedStudents: []
  _id: string
}

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'
export type Time = '7:55' | '8:40' | '9:50' | '10:35' | '11:35' | '12:20' | '13:50' | '14:35' | '15:30' | '16:15'

export type ScheduleDnD = {
  [key in Day]: { [time in Time]: CourseInstance[] }
}
