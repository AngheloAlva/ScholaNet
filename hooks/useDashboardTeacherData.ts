import { getCoursesInstancesByTeacher, getEvaluationsByCourseInstance } from '@/api/course/course-instance'
import { useEffect, useState } from 'react'

import { useToast } from '@/components/ui/use-toast'

import type { CourseInstance } from '@/types/course/course-instance'
import type { SimpleSchedule } from '@/types/course/schedule'
import type { Evaluation } from '@/types/course/evaluation'

const useDashboardTeacherData = (teacherId: string, academicYear: string): {
  courseInstances: CourseInstance[]
  isLoading: boolean
  schedules: SimpleSchedule[]
  evaluations: Evaluation[]
} => {
  const [courseInstances, setCourseInstances] = useState<CourseInstance[]>([])
  const [schedules, setSchedules] = useState<SimpleSchedule[]>([])
  const [evaluations, setEvaluations] = useState<Evaluation[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { toast } = useToast()

  useEffect(() => {
    const getCoursesInstances = async (): Promise<void> => {
      try {
        const response = await getCoursesInstancesByTeacher({ teacherId, academicYear })
        setCourseInstances(response.courseInstances)
        setSchedules(response.schedules)

        response.courseInstances.map(async (courseInstance) => {
          const evaluationsResponse = await getEvaluationsByCourseInstance(courseInstance._id)
          setEvaluations((prev) => [...prev, ...evaluationsResponse])
        })
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
    courseInstances,
    isLoading,
    schedules,
    evaluations
  }
}

export default useDashboardTeacherData
