import { calculateAttendancePercentage } from '@/helpers/calculateAttendancePercentage'
import { getAttendanceByPerson } from '@/api/course/attendance'
import { useEffect, useState } from 'react'
import { getUser } from '@/api/user/user'

import { useToast } from '@/components/ui/use-toast'

import type { User } from '@/types/user/user'

interface Response {
  teacher: User | undefined
  isLoading: boolean
  attendance: number
}

const useTeacherById = (id: string): Response => {
  const [teacher, setTeacher] = useState<User | undefined>(undefined)
  const [attendance, setAttendance] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchStudent = async (): Promise<void> => {
      try {
        const studentData = await getUser(id)
        setTeacher(studentData)

        const attendanceData = await getAttendanceByPerson(id)
        const attendanceDays = calculateAttendancePercentage(attendanceData, 180)
        setAttendance(attendanceDays)
      } catch (error) {
        toast({
          title: 'Error',
          description: (error as Error)?.message ?? 'Something went wrong',
          duration: 3000
        })
      } finally {
        setIsLoading(false)
      }
    }

    void fetchStudent()
  }, [id])

  return {
    teacher,
    isLoading,
    attendance
  }
}

export default useTeacherById
