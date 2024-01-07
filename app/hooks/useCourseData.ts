import { useEffect, useState } from 'react'

import { useToast } from '@/app/components/ui/use-toast'
import type { Course } from '@/types/course/course'
import { getCourses } from '@/api/course/course'

const useCourseData = (): {
  courses: Course[]
  totalCourses: number
  reloadCourses: () => Promise<void>
} => {
  const [courses, setCourses] = useState<Course[]>([])
  const [totalCourses, setTotalCourses] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const fetchCourses = async (): Promise<void> => {
      try {
        const response = await getCourses({ limit: 5, page: 1 })
        setCourses(response.courses)
        setTotalCourses(response.total)
      } catch (error) {
        toast({
          title: 'Error while fetching courses',
          description: (error as Error)?.message ?? 'Something went wrong',
          duration: 4000,
          variant: 'destructive'
        })
      }
    }

    void fetchCourses()
  }, [])

  const reloadCourses = async (): Promise<void> => {
    try {
      const response = await getCourses({ limit: 5, page: 1 })
      setCourses(response.courses)
      setTotalCourses(response.total)
    } catch (error) {
      toast({
        title: 'Error while fetching courses',
        description: (error as Error)?.message ?? 'Something went wrong',
        duration: 4000,
        variant: 'destructive'
      })
    }
  }

  return {
    courses,
    totalCourses,
    reloadCourses
  }
}

export default useCourseData
