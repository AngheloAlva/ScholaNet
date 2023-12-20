import axios from 'axios'
import type { CreateProgram, Program, UpdateProgram } from '@/types/schola-net/program'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface GetProgramsResponse {
  total: number
  programs: Program[]
}

export const getPrograms = async ({
  limit = 5, page = 1
}): Promise<GetProgramsResponse> => {
  const { data } = await axios.get<GetProgramsResponse>(`${API_URL}/programs?limit=${limit}&page=${page}`)
  return data
}

export const getProgram = async (id: string): Promise<Program> => {
  const { data } = await axios.get<Program>(`${API_URL}/program/${id}`)
  return data
}

export const createProgram = async ({
  name, description
}: CreateProgram): Promise<Program> => {
  const { data } = await axios.post<Program>(`${API_URL}/program`, {
    name,
    description
  })
  return data
}

export const updateProgram = async ({
  id, name, description, courses
}: UpdateProgram): Promise<Program> => {
  const { data } = await axios.put<Program>(`${API_URL}/program/${id}`, {
    name,
    description,
    courses
  })
  return data
}
