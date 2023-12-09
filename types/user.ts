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

export interface CreateUser {
  name: string
  lastName: string
  rut: string
  email: string
  password: string
}

export interface LoginUser {
  email: string
  password: string
}

export interface VerifyEmail {
  email: string
  code: string
}

export interface ResetPassword {
  token: string
  password: string
}

export interface UpdateUser {
  name?: string
  lastName?: string
  email?: string
}
