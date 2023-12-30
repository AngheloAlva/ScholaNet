import type { CourseInstance } from '../course/course-instance'
import type { BehaviorReport } from './behavior-report'
import type { Attendance } from '../course/attendance'
import type { Evaluation } from '../course/evaluation'
import type { Program } from '../schola-net/program'

export interface Student {
  _id: string
  name: string
  lastName: string
  dateOfBirth: Date
  password: string
  guardian: string
  rut: string
  program: Program
  state: 'active' | 'inactive'
  attendance: Attendance[]
  evaluations: Evaluation[]
  behaviorReports: BehaviorReport[]
  courseInstances: CourseInstance[]
}

export interface UpdateStudent {
  id: string
  password?: string
  program?: string
  guardian?: string
}
