import type { Question } from './question'

export interface Evaluation {
  _id: string
  title: string
  description: string
  courseInstance: string
  dueDate: Date
  type: 'paper' | 'online' | 'presentation' | 'project'
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
  dueDate: Date
  type: 'paper' | 'online' | 'presentation' | 'project'
  questions: Question[]
}

export interface UpdateEvaluation {
  id: string
  title?: string
  description?: string
  dueDate?: Date
  questions?: Question[]
}

export interface AddSubmission {
  id: string
  submission: Submission
  totalScore: number
  feedback: string
}
