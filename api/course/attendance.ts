import axios from 'axios'
import type { Attendance, CreateAttendance } from '@/types/course/attendance'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getAttendancesByCourse = async (courseId: string): Promise<Attendance[]> => {
  const { data } = await axios.get<Attendance[]>(`${API_URL}/api/attendance/course/${courseId}`)
  return data
}

export const getAttendanceByPerson = async (personId: string): Promise<Attendance> => {
  const { data } = await axios.get<Attendance>(`${API_URL}/api/attendance/person/${personId}`)
  return data
}

export const createAttendance = async ({
  courseInstance, date, onModel, person, status
}: CreateAttendance): Promise<Attendance> => {
  const { data } = await axios.post<Attendance>(`${API_URL}/api/attendance`, {
    courseInstance,
    date,
    onModel,
    person,
    status
  })
  return data
}
