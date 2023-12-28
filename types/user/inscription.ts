export interface Inscription {
  _id: string
  student: string
  program: string
  status: 'enrolled' | 'completed' | 'cancelled'
  enrollmentDate: Date
}

export interface CreateInscription {
  name: string
  lastName: string
  dateOfBirth: string
  password: string
  rut: string
  program: string
  guardian: string
}
