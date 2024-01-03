import axios from 'axios'

import type { Schedule, CreateSchedule } from '@/types/course/schedule'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getSchedules = async ({
  limit = 5, page = 1
}): Promise<{ total: number, schedules: Schedule[] }> => {
  const { data } = await axios.get<{ total: number, schedules: Schedule[] }>(
    `${API_URL}/schedules?limit=${limit}&page=${page}`
  )
  return data
}

export const getSchedule = async (id: string): Promise<Schedule> => {
  const { data } = await axios.get<Schedule>(`${API_URL}/schedule/${id}`)
  return data
}

export const getCoursesWithoutSchedule = async (): Promise<Schedule> => {
  const { data } = await axios.get<Schedule>(`${API_URL}/schedule/wihoutSchedule`)
  return data
}

export const createSchedule = async ({
  name, days
}: CreateSchedule): Promise<Schedule> => {
  const { data } = await axios.post<Schedule>(`${API_URL}/schedule`, {
    name, days
  })
  return data
}

export const updateSchedule = async (id: string, {
  name, days
}: Schedule): Promise<Schedule> => {
  const { data } = await axios.put<Schedule>(`${API_URL}/schedule/${id}`, {
    name, days
  })
  return data
}

export const deleteSchedule = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/schedule/${id}`)
}
