export interface CourseInstance {
  _id: string
  course: string
  teacher: string
  students: string[]
  semester: string
  academicYear: string
  classroom: string
  schedule: Array<{
    day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'
    startTime: string
    endTime: string
  }>
}

export interface CreateCourseInstance {
  course: string
  teacher: string
  semester: string
  academicYear: string
  classroom: string
  schedule: Array<{
    day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'
    startTime: string
    endTime: string
  }>
}

export interface UpdateCourseInstance {
  id: string
  teacher?: string
  classroom?: string
  schedule?: Array<{
    day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'
    startTime: string
    endTime: string
  }>
}
