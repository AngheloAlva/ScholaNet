export interface Attendance {
  _id: string
  date: Date
  student?: string
  teacher?: string
  person: string
  courseInstance: string
  status: 'present' | 'absent' | 'late' | 'excused'
}

export interface CreateAttendance {
  date: Date
  courseInstance: string
  onModel: 'Student' | 'Teacher'
  person: string
  status: 'present' | 'absent' | 'late' | 'excused'
}
