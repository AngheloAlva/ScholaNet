import axios from 'axios'
import type { CreateMaterial, Material } from '@/types/course/material'

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

export async function getMaterial (id: string): Promise<Material> {
  const { data } = await axios.get<Material>(`${API_URL}/material/${id}`)
  return data
}

export async function createMaterial ({
  courseInstance, description, title, type, url
}: CreateMaterial): Promise<Material> {
  const { data } = await axios.post<Material>(`${API_URL}/material`, {
    courseInstance,
    description,
    title,
    type,
    url
  })

  return data
}
