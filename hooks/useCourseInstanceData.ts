import { getCourseInstances } from '@/api/course/course-instance'
import { useEffect, useState } from 'react'

import { useToast } from '@/components/ui/use-toast'
import type { CourseInstance } from '@/types/course/course-instance'

const useCourseInstanceData = (): {
  courseInstances: CourseInstance[]
  totalCourseInstances: number
  reloadCourseInstances: () => Promise<void>
} => {
  const [courseInstances, setCourseInstances] = useState<CourseInstance[]>([])
  const [totalCourseInstances, setTotalCourseInstances] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const fetchCourseInstances = async (): Promise<void> => {
      try {
        const response = await getCourseInstances({ limit: 5, page: 1 })
        setCourseInstances(response.courseInstances)
        setTotalCourseInstances(response.total)
      } catch (error) {
        toast({
          title: 'Error while fetching courseInstances',
          description: (error as Error)?.message ?? 'Something went wrong',
          duration: 4000,
          variant: 'destructive'
        })
      }
    }

    void fetchCourseInstances()
  }, [])

  const reloadCourseInstances = async (): Promise<void> => {
    try {
      const response = await getCourseInstances({ limit: 5, page: 1 })
      setCourseInstances(response.courseInstances)
      setTotalCourseInstances(response.total)
    } catch (error) {
      toast({
        title: 'Error while fetching courseInstances',
        description: (error as Error)?.message ?? 'Something went wrong',
        duration: 4000,
        variant: 'destructive'
      })
    }
  }

  return {
    courseInstances,
    totalCourseInstances,
    reloadCourseInstances
  }
}

export default useCourseInstanceData
