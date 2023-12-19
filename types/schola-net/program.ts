export interface Program {
  _id: string
  name: string
  description: string
  courses: string[]
}

export interface CreateProgram {
  name: string
  description: string
}

export interface UpdateProgram {
  id: string
  name?: string
  description?: string
  courses?: string[]
}
