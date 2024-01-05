import { getCourseInstance, getEvaluationsByCourseInstance, getMaterialsByCourseInstance } from '@/api/course/course-instance'
import { useEffect, useState } from 'react'

import { useToast } from '@/components/ui/use-toast'
import type { CourseInstance } from '@/types/course/course-instance'
import type { Material } from '@/types/course/material'
import type { Evaluation } from '@/types/course/evaluation'

const useCourseInstanceById = (courseInstanceId: string): {
  courseInstance: CourseInstance | undefined
  materials: Material[]
  evaluations: Evaluation[]
  isLoading: boolean
} => {
  const [courseInstance, setCourseInstance] = useState<CourseInstance>()
  const [evaluations, setEvaluations] = useState<Evaluation[]>([])
  const [materials, setMaterials] = useState<Material[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { toast } = useToast()

  useEffect(() => {
    const fetchCourseInstances = async (): Promise<void> => {
      try {
        const response = await getCourseInstance(courseInstanceId)
        setCourseInstance(response)

        const materialResponse = await getMaterialsByCourseInstance(courseInstanceId)
        setMaterials(materialResponse)

        const evaluationResponse = await getEvaluationsByCourseInstance(courseInstanceId)
        setEvaluations(evaluationResponse)
      } catch (error) {
        toast({
          title: 'Error while fetching courseInstances',
          description: (error as Error)?.message ?? 'Something went wrong',
          duration: 4000,
          variant: 'destructive'
        })
      } finally {
        setIsLoading(false)
      }
    }

    void fetchCourseInstances()
  }, [])

  return {
    courseInstance,
    materials,
    evaluations,
    isLoading
  }
}

export default useCourseInstanceById
