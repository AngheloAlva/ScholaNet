import type { Inscription, CreateInscription } from '@/types/user/inscription'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface getInscriptionResponse {
  total: number
  inscriptions: Inscription[]
}

export const getInscriptions = async ({
  page = 1, limit = 5
}): Promise<getInscriptionResponse> => {
  const { data } = await axios.get<getInscriptionResponse>(`${API_URL}/api/inscriptions?page=${page}&limit=${limit}`)
  return data
}

export const getInscription = async (id: string): Promise<Inscription> => {
  const { data } = await axios.get<Inscription>(`${API_URL}/api/inscription/${id}`)
  return data
}

export const createInscription = async ({
  dateOfBirth, guardian, lastName, name, password, program, rut
}: CreateInscription): Promise<Inscription> => {
  const { data } = await axios.post<Inscription>(`${API_URL}/api/inscription`, {
    dateOfBirth,
    guardian,
    lastName,
    name,
    password,
    program,
    rut
  })
  return data
}
