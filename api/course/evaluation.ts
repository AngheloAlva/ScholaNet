import axios from 'axios'
import type { Evaluation, CreateEvaluation, UpdateEvaluation, AddSubmission } from '../../types/course/evaluation'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface CreateEvaluationResponse {
  total: number
  evaluations: Evaluation[]
}

export const getEvaluations = async ({
  page = 1, limit = 5
}): Promise<CreateEvaluationResponse> => {
  const { data } = await axios.get<CreateEvaluationResponse>(`${API_URL}/evaluations?page=${page}&limit=${limit}`)
  return data
}

export const getEvaluation = async (id: string): Promise<Evaluation> => {
  const { data } = await axios.get<Evaluation>(`${API_URL}/evaluation/${id}`)
  return data
}

export const createEvaluation = async ({
  courseInstance, description, dueDate, title, type
}: CreateEvaluation): Promise<Evaluation> => {
  const { data } = await axios.post<Evaluation>(`${API_URL}/evaluation`, {
    courseInstance,
    description,
    dueDate,
    title,
    type
  })
  return data
}

export const addSubmission = async ({
  id, submission, totalScore, feedback
}: AddSubmission): Promise<Evaluation> => {
  const { data } = await axios.put<Evaluation>(`${API_URL}/evaluation/submission/${id}`, {
    submission,
    totalScore,
    feedback
  })
  return data
}

export const updateEvaluation = async ({
  id, title, description, dueDate, questions, totalScore
}: UpdateEvaluation): Promise<Evaluation> => {
  const { data } = await axios.put<Evaluation>(`${API_URL}/evaluation/${id}`, {
    title,
    description,
    dueDate,
    questions,
    totalScore
  })
  return data
}

export const deleteEvaluation = async (id: string): Promise<string> => {
  const { data } = await axios.delete<{ message: string }>(`${API_URL}/evaluation/${id}`)
  return data.message
}
