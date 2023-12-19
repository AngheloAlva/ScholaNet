export interface Question {
  _id: string
  questionText: string
  options: string[]
  correctAnswer: string
  points: number
  questionType: 'multipleChoice' | 'trueFalse' | 'shortAnswer'
  evaluation: string
}

export interface CreateQuestion {
  questionText: string
  options: string[]
  correctAnswer: string
  points: number
  questionType: 'multipleChoice' | 'trueFalse' | 'shortAnswer'
  evaluation: string
}

export interface UpdateQuestion {
  id: string
  questionText?: string
  options?: string[]
  correctAnswer?: string
  points?: number
  questionType?: 'multipleChoice' | 'trueFalse' | 'shortAnswer'
  evaluation?: string
}
