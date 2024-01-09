import { getScheduleByStudent } from '@/api/course/schedule'
import { useEffect, useState } from 'react'

import { useToast } from '@/app/components/ui/use-toast'

import type { Schedule } from '@/types/course/schedule'

const useDashboardStudentData = (studentId: string): {
  isLoading: boolean
  schedules: Schedule | undefined
} => {
  const [schedules, setSchedules] = useState<Schedule | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { toast } = useToast()

  useEffect(() => {
    const getCoursesInstances = async (): Promise<void> => {
      try {
        const response = await getScheduleByStudent(studentId)
        setSchedules(response)
      } catch (error) {
        toast({
          title: 'Error',
          description: `We could not get the courses instances, ${(error as any).message}`
        })
      } finally {
        setIsLoading(false)
      }
    }

    void getCoursesInstances()
  }, [])

  return {
    isLoading,
    schedules
  }
}

export default useDashboardStudentData
