import axios from 'axios'
import type { Material, CreateMaterial, UpdateMaterial } from '@/types/course/material'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface GetMaterialResponse {
  total: number
  materials: Material[]
}

export async function getMaterials ({
  page = 1, limit = 10
}): Promise<GetMaterialResponse> {
  const { data } = await axios.get<GetMaterialResponse>(`${API_URL}/course/materials?page=${page}&limit=${limit}`)
  return data
}
