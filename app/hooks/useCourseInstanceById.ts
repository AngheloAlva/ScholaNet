import { getCourseInstance, getEvaluationsByCourseInstance, getMaterialsByCourseInstance } from '@/api/course/course-instance'
import { useEffect, useState } from 'react'

import { useToast } from '@/app/components/ui/use-toast'
import type { CourseInstance } from '@/types/course/course-instance'
import type { Material } from '@/types/course/material'
import type { Evaluation } from '@/types/course/evaluation'

const useCourseInstanceById = (courseInstanceId: string): {
  courseInstance: CourseInstance | undefined
  materials: Material[]
  evaluations: Evaluation[]
  isLoading: boolean
  reloadEvaluations: () => Promise<void>
  reloadMaterials: () => Promise<void>
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

  const reloadEvaluations = async (): Promise<void> => {
    try {
      const evaluationResponse = await getEvaluationsByCourseInstance(courseInstanceId)
      setEvaluations(evaluationResponse)
    } catch (error) {
      toast({
        title: 'Error while fetching evaluations',
        description: (error as Error)?.message ?? 'Something went wrong',
        duration: 4000,
        variant: 'destructive'
      })
    }
  }

  const reloadMaterials = async (): Promise<void> => {
    try {
      const materialResponse = await getMaterialsByCourseInstance(courseInstanceId)
      setMaterials(materialResponse)
    } catch (error) {
      toast({
        title: 'Error while fetching materials',
        description: (error as Error)?.message ?? 'Something went wrong',
        duration: 4000,
        variant: 'destructive'
      })
    }
  }

  return {
    courseInstance,
    materials,
    evaluations,
    isLoading,
    reloadEvaluations,
    reloadMaterials
  }
}

export default useCourseInstanceById
