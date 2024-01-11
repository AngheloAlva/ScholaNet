import type { CourseInstance } from './course-instance'
import type { Question } from './question'

export interface Evaluation {
  _id: string
  title: string
  description: string
  courseInstance: CourseInstance
  dueDate: string
  type: string
  questions: Question[]
  submissions: Submission[]
  totalScore: number
  feedback: string
  duration: number
}

interface Submission {
  student: string
  startTime: string
  endTime: string
  attempt: number
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
  duration: number
}

export interface UpdateEvaluation {
  id: string
  title?: string
  description?: string
  dueDate?: string
  questions?: string[]
  totalScore?: number
  duration?: number
  maxAttempts?: number
}

export interface AddSubmission {
  id: string
  submission: {
    student: string
    endTime: string
    answers: Array<{
      question: string
      answer: string[]
    }>
  }
}
