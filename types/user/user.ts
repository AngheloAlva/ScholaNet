import type { Student } from '../student/student'

export interface User {
  _id: string
  name: string
  lastName: string
  rut: string
  email: string
  password: string
  role: 'admin' | 'guardian' | 'teacher'
  students: Student[]
  state: 'active' | 'inactive'
  verificationCode: string
  emailVerified: boolean
  resetPasswordToken?: string
  refreshToken: string
}

export interface UpdateUser {
  id: string
  name?: string
  lastName?: string
  email?: string
}
