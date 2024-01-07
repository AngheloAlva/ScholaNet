import { useEffect, useState } from 'react'
import { getTeachers } from '@/api/user/user'

import { useToast } from '@/app/components/ui/use-toast'
import type { User } from '@/types/user/user'

const useTeacherData = (): {
  teachers: User[]
  totalTeachers: number
  reloadTeachers: () => Promise<void>
} => {
  const [teachers, setTeachers] = useState<User[]>([])
  const [totalTeachers, setTotalTeachers] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const fetchTeachers = async (): Promise<void> => {
      try {
        const response = await getTeachers({ limit: 5, page: 1 })
        setTeachers(response.teachers)
        setTotalTeachers(response.total)
      } catch (error) {
        toast({
          title: 'Error while fetching teachers',
          description: (error as Error)?.message ?? 'Something went wrong',
          duration: 4000,
          variant: 'destructive'
        })
      }
    }

    void fetchTeachers()
  }, [])

  const reloadTeachers = async (): Promise<void> => {
    try {
      const response = await getTeachers({ limit: 5, page: 1 })
      setTeachers(response.teachers)
      setTotalTeachers(response.total)
    } catch (error) {
      toast({
        title: 'Error while fetching teachers',
        description: (error as Error)?.message ?? 'Something went wrong',
        duration: 4000,
        variant: 'destructive'
      })
    }
  }

  return {
    teachers,
    totalTeachers,
    reloadTeachers
  }
}

export default useTeacherData
