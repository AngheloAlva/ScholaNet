import { useEffect, useState } from 'react'
import { getPrograms } from '@/api/scholanet/program'

import { useToast } from '@/components/ui/use-toast'
import type { Program } from '@/types/schola-net/program'

const useProgramData = (): {
  programs: Program[]
  totalPrograms: number
  reloadPrograms: () => Promise<void>
} => {
  const [programs, setPrograms] = useState<Program[]>([])
  const [totalPrograms, setTotalPrograms] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const fetchPrograms = async (): Promise<void> => {
      try {
        const response = await getPrograms({ limit: 5, page: 1 })
        setPrograms(response.programs)
        setTotalPrograms(response.total)
      } catch (error) {
        toast({
          title: 'Error while fetching programs',
          description: (error as Error)?.message ?? 'Something went wrong',
          duration: 4000,
          variant: 'destructive'
        })
      }
    }

    void fetchPrograms()
  }, [])

  const reloadPrograms = async (): Promise<void> => {
    try {
      const response = await getPrograms({ limit: 5, page: 1 })
      setPrograms(response.programs)
      setTotalPrograms(response.total)
    } catch (error) {
      toast({
        title: 'Error while fetching programs',
        description: (error as Error)?.message ?? 'Something went wrong',
        duration: 4000,
        variant: 'destructive'
      })
    }
  }

  return {
    programs,
    totalPrograms,
    reloadPrograms
  }
}

export default useProgramData
