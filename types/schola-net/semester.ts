export interface Semester {
  _id: string
  name: string
  startDate: string
  endDate: string
}

export interface CreateSemester {
  name: string
  startDate: string
  endDate: string
}

export interface UpdateSemester {
  id: string
  name: string
  startDate: Date
  endDate: Date
}
