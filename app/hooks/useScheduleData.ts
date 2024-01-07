import { useEffect, useState } from 'react'
import { getSchedules } from '@/api/course/schedule'

import { useToast } from '@/app/components/ui/use-toast'
import type { Schedule } from '@/types/course/schedule'

const useScheduleData = (): {
  schedules: Schedule[]
  totalSchedules: number
  reloadSchedules: () => Promise<void>
} => {
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [totalSchedules, setTotalSchedules] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const fetchSchedules = async (): Promise<void> => {
      try {
        const response = await getSchedules({ limit: 5, page: 1 })
        setSchedules(response.schedules)
        setTotalSchedules(response.total)
      } catch (error) {
        toast({
          title: 'Error while fetching schedules',
          description: (error as Error)?.message ?? 'Something went wrong',
          duration: 4000,
          variant: 'destructive'
        })
      }
    }

    void fetchSchedules()
  }, [])

  const reloadSchedules = async (): Promise<void> => {
    try {
      const response = await getSchedules({ limit: 5, page: 1 })
      setSchedules(response.schedules)
      setTotalSchedules(response.total)
    } catch (error) {
      toast({
        title: 'Error while fetching schedules',
        description: (error as Error)?.message ?? 'Something went wrong',
        duration: 4000,
        variant: 'destructive'
      })
    }
  }

  return {
    schedules,
    totalSchedules,
    reloadSchedules
  }
}

export default useScheduleData
