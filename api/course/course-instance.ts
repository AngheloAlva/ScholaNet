import axios from 'axios'
import type { CourseInstance, UpdateCourseInstance, CreateCourseInstance } from '../../types/course/course-instance'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface CourseInstanceResponse {
  total: number
  courseInstances: CourseInstance[]
}

export const getCourseInstances = async ({
  limit = 5, page = 1
}): Promise<CourseInstanceResponse> => {
  const { data } = await axios.get<CourseInstanceResponse>(`${API_URL}/course-instances?limit=${limit}&page=${page}`)
  return data
}

export const getCourseInstance = async (id: string): Promise<CourseInstance> => {
  const { data } = await axios.get<CourseInstance>(`${API_URL}/course-instance/${id}`)
  return data
}

export const getEvaluationsByCourseInstance = async (id: string): Promise<CourseInstance> => {
  const { data } = await axios.get<CourseInstance>(`${API_URL}/course-instance/evaluations/${id}`)
  return data
}

export const getMaterialsByCourseInstance = async (id: string): Promise<CourseInstance> => {
  const { data } = await axios.get<CourseInstance>(`${API_URL}/course-instance/materials/${id}`)
  return data
}

export const createCourseInstance = async ({
  academicYear, classroom, course, schedule, semester, teacher
}: CreateCourseInstance): Promise<CourseInstance> => {
  const { data } = await axios.post<CourseInstance>(`${API_URL}/course-instance`, {
    academicYear,
    classroom,
    course,
    schedule,
    semester,
    teacher
  })
  return data
}

export const addStudentToCourseInstance = async (id: string, studentId: string): Promise<CourseInstance> => {
  const { data } = await axios.put<CourseInstance>(`${API_URL}/course-instance/add-student/${id}`, {
    studentId
  })
  return data
}

export const updateCourseInstance = async ({
  id, classroom, schedule, teacher
}: UpdateCourseInstance): Promise<CourseInstance> => {
  const { data } = await axios.put<CourseInstance>(`${API_URL}/course-instance/${id}`, {
    classroom,
    schedule,
    teacher
  })
  return data
}

export const getAverageGradeByStudent = async ({
  courseInstanceId, studentId
}: { courseInstanceId: string, studentId: string }): Promise<number> => {
  const { data } = await axios.get<number>(
    `${API_URL}/course-instance/${courseInstanceId}/student/${studentId}`
  )

  return data
}
