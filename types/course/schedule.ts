import type { Student } from '../student/student'

export interface Schedule {
  _id: string
  name: string
  days: Array<{
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'
    blocks: Array<{
      startTime: string
      endTime: string
      courseInstance: string
      assignedStudents: Student[]
    }>
  }>
}
