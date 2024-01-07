import { getStudents } from '@/api/student/student'
import { useEffect, useState } from 'react'

import { useToast } from '@/app/components/ui/use-toast'
import type { Student } from '@/types/student/student'

const useStudentData = (): {
  students: Student[]
  totalStudents: number
  reloadStudents: () => Promise<void>
} => {
  const [students, setStudents] = useState<Student[]>([])
  const [totalStudents, setTotalStudents] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const fetchStudents = async (): Promise<void> => {
      try {
        const response = await getStudents({ limit: 5, page: 1 })
        setStudents(response.students)
        setTotalStudents(response.total)
      } catch (error) {
        toast({
          title: 'Error while fetching students',
          description: (error as Error)?.message ?? 'Something went wrong',
          duration: 4000,
          variant: 'destructive'
        })
      }
    }

    void fetchStudents()
  }, [])

  const reloadStudents = async (): Promise<void> => {
    try {
      const response = await getStudents({ limit: 5, page: 1 })
      setStudents(response.students)
      setTotalStudents(response.total)
    } catch (error) {
      toast({
        title: 'Error while fetching students',
        description: (error as Error)?.message ?? 'Something went wrong',
        duration: 4000,
        variant: 'destructive'
      })
    }
  }

  return {
    students,
    totalStudents,
    reloadStudents
  }
}

export default useStudentData
