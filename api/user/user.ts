import axios from 'axios'
import type { User, UpdateUser } from '@/types/user/user'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getUsers = async ({
  limit = 10, page = 1
}): Promise<User[]> => {
  const { data } = await axios.get<User[]>(`${API_URL}/users`)
  return data
}

export const getUser = async (id: string): Promise<User> => {
  const { data } = await axios.get<User>(`${API_URL}/user/${id}`)
  return data
}

export const getUserByRut = async (rut: string): Promise<User> => {
  const { data } = await axios.get<User>(`${API_URL}/user/rut/${rut}`)
  return data
}

export const getCoursesInstancesByTeacher = async (id: string): Promise<User> => {
  const { data } = await axios.get<User>(`${API_URL}/user/courses-instances/teacher/${id}`)
  return data
}

export const updateUser = async ({
  email, lastName, name, id
}: UpdateUser): Promise<User> => {
  const { data } = await axios.put<User>(`${API_URL}/user/${id}`, {
    email,
    lastName,
    name
  })
  return data
}
