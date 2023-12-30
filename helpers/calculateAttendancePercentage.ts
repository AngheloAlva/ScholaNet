import type { Attendance } from '@/types/course/attendance'

export const calculateAttendancePercentage = (attendanceData: Attendance[], totalClassDays: number): number => {
  const attendedDays = attendanceData.filter(day => day.status === 'present' || day.status === 'late').length
  return attendedDays / totalClassDays * 100
}
