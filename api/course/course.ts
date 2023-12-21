import axios from 'axios'
import type { Course, CreateCourse, UpdateCourse } from '../../types/course/course'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface CourseResponse {
  total: number
  courses: Course[]
}

export const getCourses = async ({
  limit = 5, page = 1
}): Promise<CourseResponse> => {
  const { data } = await axios.get<CourseResponse>(`${API_URL}/courses?limit=${limit}&page=${page}`)
  return data
}

export const getCourse = async (id: string): Promise<Course> => {
  const { data } = await axios.get<Course>(`${API_URL}/course/${id}`)
  return data
}

export const createCourse = async ({
  title, description, href, image, program
}: CreateCourse): Promise<Course> => {
  const { data } = await axios.post<Course>(`${API_URL}/course`, {
    title,
    description,
    href,
    image,
    program
  })
  return data
}

export const updateCourse = async ({
  _id, title, description, href, image
}: UpdateCourse): Promise<Course> => {
  const { data } = await axios.put<Course>(`${API_URL}/course/${_id}`, {
    title,
    description,
    href,
    image
  })
  return data
}

export const deleteCourse = async (id: string): Promise<string> => {
  const { data } = await axios.delete<{ message: string }>(`${API_URL}/course/${id}`)
  return data.message
}
