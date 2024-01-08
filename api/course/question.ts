import axios from 'axios'
import type { CreateQuestion, Question, UpdateQuestion } from '../../types/course/question'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getQuestionById = async (id: string): Promise<Question> => {
  const { data } = await axios.get(`${API_URL}/question/${id}`)
  return data
}

export const getQuestionsByEvaluation = async (
  evaluation: string
): Promise<{ questions: Question[], total: number }> => {
  const { data } = await axios.get<{ questions: Question[], total: number }>(
    `${API_URL}/questions/evaluation/${evaluation}`
  )
  return data
}

export const createQuestions = async ({
  evaluation, questions
}: CreateQuestion): Promise<Question[]> => {
  const { data } = await axios.post<Question[]>(`${API_URL}/question`, {
    evaluation,
    questions
  })
  return data
}

export const updateQuestion = async ({
  id, correctAnswer, evaluation, options, points, questionText, questionType
}: UpdateQuestion): Promise<Question> => {
  const { data } = await axios.put(`${API_URL}/question/${id}`, {
    correctAnswer,
    evaluation,
    options,
    points,
    questionText,
    questionType
  })
  return data
}

export const deleteQuestion = async (id: string): Promise<Question> => {
  const { data } = await axios.delete(`${API_URL}/question/${id}`)
  return data
}
