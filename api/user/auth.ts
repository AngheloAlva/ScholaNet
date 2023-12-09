import axios from 'axios'
import type { CreateUser, LoginUser, User, VerifyEmail, ResetPassword } from '@/types/user'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const register = async ({
  name, lastName, rut, email, password
}: CreateUser): Promise<User> => {
  const { data } = await axios.post(`${API_URL}/user`, {
    name,
    lastName,
    rut,
    email,
    password
  })

  return data
}

export const login = async ({
  email, password
}: LoginUser): Promise<{ token: string, refreshToken: string }> => {
  const { data } = await axios.post(`${API_URL}/user/login`, {
    email,
    password
  })

  return data
}

export const verifyEmail = async ({
  email, code
}: VerifyEmail): Promise<string> => {
  const { data } = await axios.post(`${API_URL}/user/verify-email`, {
    email,
    code
  })

  return data
}

export const requestResetPassword = async (email: string): Promise<string> => {
  const { data } = await axios.post(`${API_URL}/user/request-password-reset`, {
    email
  })

  return data
}

export const resetPassword = async ({
  token, password
}: ResetPassword): Promise<string> => {
  const { data } = await axios.post(`${API_URL}/user/reset-password`, {
    token,
    password
  })

  return data
}

export const refreshToken = async (refreshToken: string): Promise<string> => {
  const { data } = await axios.post(`${API_URL}/user/refresh-token`, {
    refreshToken
  })

  return data
}
