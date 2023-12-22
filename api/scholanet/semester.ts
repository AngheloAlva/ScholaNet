import axios from 'axios'
import type { CreateSemester, Semester, UpdateSemester } from '@/types/schola-net/semester'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface GetSemestersResponse {
  semesters: Semester[]
  total: number
}

export const getSemesters = async ({
  limit = 5, page = 1
}): Promise<GetSemestersResponse> => {
  const { data } = await axios.get<GetSemestersResponse>(`${API_URL}/semesters?total=${limit}&page=${page}`)
  return data
}

export const getSemester = async (id: string): Promise<Semester> => {
  const { data } = await axios.get<Semester>(`${API_URL}/semester/${id}`)
  return data
}

export const createSemester = async ({
  endDate, name, startDate
}: CreateSemester): Promise<Semester> => {
  const { data } = await axios.post<Semester>(`${API_URL}/semester`, {
    endDate,
    name,
    startDate
  })
  return data
}

export const updateSemester = async ({
  endDate, name, startDate, id
}: UpdateSemester): Promise<Semester> => {
  const { data } = await axios.put<Semester>(`${API_URL}/semester/${id}`, {
    endDate,
    name,
    startDate
  })
  return data
}
