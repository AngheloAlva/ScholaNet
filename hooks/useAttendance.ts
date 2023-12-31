import { getAttendanceByPerson } from '@/api/course/attendance'
import { useEffect, useState } from 'react'

import type { Attendance } from '@/types/course/attendance'

const useAttendance = (id: string): {
  attendances: Attendance[]
  isLoading: boolean
} => {
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchAttendance = async (): Promise<void> => {
      const response = await getAttendanceByPerson(id)
      setAttendances(response)
      setIsLoading(false)
    }

    void fetchAttendance()
  }, [id])

  return {
    attendances,
    isLoading
  }
}

export default useAttendance
