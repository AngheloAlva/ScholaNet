import type { CourseInstance } from './course-instance'

export interface Evaluation {
  _id: string
  title: string
  description: string
  courseInstance: CourseInstance
  dueDate: string
  type: string
  questions: string[]
  submissions: Submission[]
  totalScore: number
  feedback: string
}

interface Submission {
  student: string
  answers: Array<{
    question: string
    answer: string[]
    score: number
    feedback: string
  }>
}

export interface CreateEvaluation {
  title: string
  description: string
  courseInstance: string
  dueDate: string
  type: string
}

export interface UpdateEvaluation {
  id: string
  title?: string
  description?: string
  dueDate?: string
  questions?: string[]
  totalScore?: number
}

export interface AddSubmission {
  id: string
  submission: Submission
  totalScore: number
  feedback: string
}
