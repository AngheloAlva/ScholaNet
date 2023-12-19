import axios from 'axios'
import type { BehaviorReport, UpdateBehaviorReport } from '@/types/student/behavior-report'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface BehaviorReportResponse {
  total: number
  behaviorReports: BehaviorReport[]
}

export const getBehaviorReports = async ({
  limit = 5, page = 1
}): Promise<BehaviorReportResponse> => {
  const { data } = await axios.get<BehaviorReportResponse>(`${API_URL}/behavior-reports?limit=${limit}&page=${page}`)
  return data
}

export const getBehaviorReport = async (id: string): Promise<BehaviorReport> => {
  const { data } = await axios.get<BehaviorReport>(`${API_URL}/behavior-report/${id}`)
  return data
}

export const createBehaviorReport = async ({
  student, description, severity, resolved
}: BehaviorReport): Promise<BehaviorReport> => {
  const date = new Date()

  const { data } = await axios.post<BehaviorReport>(`${API_URL}/behavior-report`, {
    date,
    student,
    description,
    severity,
    resolved
  })
  return data
}

export const updateBehaviorReport = async ({
  id, description, severity, resolved
}: UpdateBehaviorReport): Promise<BehaviorReport> => {
  const { data } = await axios.put<BehaviorReport>(`${API_URL}/behavior-report/${id}`, {
    description,
    severity,
    resolved
  })
  return data
}
