import axios from 'axios'

import type { User, UpdateUser } from '@/types/user/user'
import type { Student } from '@/types/student/student'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface GetUsersResponse {
  users: User[]
  total: number
}

interface GetTeachersResponse {
  teachers: User[]
  total: number
}

export const getUsers = async ({
  limit = 10, page = 1
}): Promise<GetUsersResponse> => {
  const { data } = await axios.get<GetUsersResponse>(`${API_URL}/users?limit=${limit}&page=${page}`)
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

export const getTeachers = async ({
  limit = 5, page = 1
}): Promise<GetTeachersResponse> => {
  const { data } = await axios.get<GetTeachersResponse>(`${API_URL}/users/teachers?limit=${limit}&page=${page}`)
  return data
}

export const getStudentsByGuardian = async (id: string): Promise<Student[]> => {
  const { data } = await axios.get<Student[]>(`${API_URL}/user/${id}/students`)
  return data
}
