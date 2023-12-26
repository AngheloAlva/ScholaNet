import { getInscriptions } from '@/api/user/inscription'
import { useEffect, useState } from 'react'

import { useToast } from '@/components/ui/use-toast'
import type { Inscription } from '@/types/user/inscription'

const useInscriptionData = (): {
  inscriptions: Inscription[]
  totalInscriptions: number
  reloadInscriptions: () => Promise<void>
} => {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([])
  const [totalInscriptions, setTotalInscriptions] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const fetchInscriptions = async (): Promise<void> => {
      try {
        const response = await getInscriptions({ limit: 5, page: 1 })
        setInscriptions(response.inscriptions)
        setTotalInscriptions(response.total)
      } catch (error) {
        toast({
          title: 'Error while fetching inscriptions',
          description: (error as Error)?.message ?? 'Something went wrong',
          duration: 4000,
          variant: 'destructive'
        })
      }
    }

    void fetchInscriptions()
  }, [])

  const reloadInscriptions = async (): Promise<void> => {
    try {
      const response = await getInscriptions({ limit: 5, page: 1 })
      setInscriptions(response.inscriptions)
      setTotalInscriptions(response.total)
    } catch (error) {
      toast({
        title: 'Error while fetching inscriptions',
        description: (error as Error)?.message ?? 'Something went wrong',
        duration: 4000,
        variant: 'destructive'
      })
    }
  }

  return {
    inscriptions,
    totalInscriptions,
    reloadInscriptions
  }
}

export default useInscriptionData
