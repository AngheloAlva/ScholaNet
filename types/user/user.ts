export interface User {
  name: string
  lastName: string
  rut: string
  email: string
  password: string
  role: 'admin' | 'guardian' | 'teacher'
  students?: string[]
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