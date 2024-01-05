import axios from 'axios'
import type { CourseInstance, UpdateCourseInstance, CreateCourseInstance } from '../../types/course/course-instance'
import type { SimpleSchedule } from '@/types/course/schedule'
import type { Evaluation } from '@/types/course/evaluation'
import type { Material } from '@/types/course/material'

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

export const getEvaluationsByCourseInstance = async (id: string): Promise<Evaluation[]> => {
  const { data } = await axios.get<Evaluation[]>(`${API_URL}/course-instance/evaluations/${id}`)
  return data
}

export const getMaterialsByCourseInstance = async (id: string): Promise<Material[]> => {
  const { data } = await axios.get<Material[]>(`${API_URL}/course-instance/materials/${id}`)
  return data
}

export const createCourseInstance = async ({
  academicYear, classroom, course, semester, teacher
}: CreateCourseInstance): Promise<CourseInstance> => {
  const { data } = await axios.post<CourseInstance>(`${API_URL}/course-instance`, {
    academicYear,
    classroom,
    course,
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
  id, classroom, teacher
}: UpdateCourseInstance): Promise<CourseInstance> => {
  const { data } = await axios.put<CourseInstance>(`${API_URL}/course-instance/${id}`, {
    classroom,
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

interface CourseInstanceByStudentResponse {
  schedules: SimpleSchedule[]
  courseInstances: CourseInstance[]
}

export const getCoursesInstancesByTeacher = async ({
  teacherId, academicYear
}: { teacherId: string, academicYear: string }): Promise<CourseInstanceByStudentResponse> => {
  const { data } = await axios.get<CourseInstanceByStudentResponse>(
    `${API_URL}/course-instance/teacher/${teacherId}?academicYear=${academicYear}`
  )

  return data
}
