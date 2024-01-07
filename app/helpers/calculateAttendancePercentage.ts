import type { Attendance } from '@/types/course/attendance'

export const calculateAttendancePercentage = (attendanceData: Attendance[], totalClassDays: number): number => {
  const uniqueAttendanceDays = new Set()

  attendanceData.forEach(attendance => {
    const date = new Date(attendance.date)
    const dayString = date.toISOString().split('T')[0]
    if (attendance.status === 'present' || attendance.status === 'late') {
      uniqueAttendanceDays.add(dayString)
    }
  })

  return (uniqueAttendanceDays.size / totalClassDays) * 100
}
