import { useToast } from '@/app/components/ui/use-toast'
import { useEffect, useState } from 'react'

import type { Semester } from '@/types/schola-net/semester'
import { getSemesters } from '@/api/scholanet/semester'

const useSemesterData = (): {
  semesters: Semester[]
  totalSemesters: number
  reloadSemesters: () => Promise<void>
} => {
  const [semesters, setSemesters] = useState<Semester[]>([])
  const [totalSemesters, setTotalSemesters] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const fetchSemesters = async (): Promise<void> => {
      try {
        const response = await getSemesters({ limit: 5, page: 1 })
        setSemesters(response.semesters)
        setTotalSemesters(response.total)
      } catch (error) {
        toast({
          title: 'Error while fetching semesters',
          description: (error as Error)?.message ?? 'Something went wrong',
          duration: 4000,
          variant: 'destructive'
        })
      }
    }

    void fetchSemesters()
  }, [])

  const reloadSemesters = async (): Promise<void> => {
    try {
      const response = await getSemesters({ limit: 5, page: 1 })
      setSemesters(response.semesters)
      setTotalSemesters(response.total)
    } catch (error) {
      toast({
        title: 'Error while fetching semesters',
        description: (error as Error)?.message ?? 'Something went wrong',
        duration: 4000,
        variant: 'destructive'
      })
    }
  }

  return {
    semesters,
    totalSemesters,
    reloadSemesters
  }
}

export default useSemesterData
