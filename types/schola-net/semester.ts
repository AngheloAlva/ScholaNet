export interface Semester {
  _id: string
  name: string
  startDate: Date
  endDate: Date
}

export interface CreateSemester {
  name: string
  startDate: Date
  endDate: Date
}

export interface UpdateSemester {
  id: string
  name: string
  startDate: Date
  endDate: Date
}
