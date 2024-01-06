import type { CourseInstance } from './course-instance'
import type { Question } from './question'

export interface Evaluation {
  _id: string
  title: string
  description: string
  courseInstance: CourseInstance
  dueDate: Date
  type: string
  questions: Question[]
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
  questions?: Question[]
}

export interface AddSubmission {
  id: string
  submission: Submission
  totalScore: number
  feedback: string
}
