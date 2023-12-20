import axios from 'axios'
import type { Student, UpdateStudent } from '@/types/student/student'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface GetStudentsResponse {
  total: number
  students: Student[]
}

export const getStudents = async ({
  limit = 10, page = 1
}): Promise<GetStudentsResponse> => {
  const { data } = await axios.get<GetStudentsResponse>(`${API_URL}/students`)
  return data
}

export const getStudent = async (id: string): Promise<Student> => {
  const { data } = await axios.get<Student>(`${API_URL}/student/${id}`)
  return data
}

export const updateStudent = async ({
  id, guardian, password, program
}: UpdateStudent): Promise<Student> => {
  const { data } = await axios.put<Student>(`${API_URL}/student/${id}`, {
    guardian,
    password,
    program
  })
  return data
}

export const deleteStudent = async (id: string): Promise<Student> => {
  const { data } = await axios.delete<Student>(`${API_URL}/student/${id}`)
  return data
}
