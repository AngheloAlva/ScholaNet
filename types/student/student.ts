export interface Student {
  _id: string
  name: string
  dateOfBirth: string
  password: string
  guardian: string
  rut: string
  program: string
  state: 'active' | 'inactive'
}

export interface UpdateStudent {
  id: string
  password?: string
  program?: string
  guardian?: string
}
