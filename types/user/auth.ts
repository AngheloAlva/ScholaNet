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
