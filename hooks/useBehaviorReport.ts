import { getBehaviorReportsByStudent } from '@/api/student/behavior-report'
import { useEffect, useState } from 'react'

import type { BehaviorReport } from '@/types/student/behavior-report'

const useBehaviorReport = (id: string): {
  behaviorReports: BehaviorReport[]
  isLoading: boolean
} => {
  const [behaviorReports, setBehaviorReports] = useState<BehaviorReport[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchBehaviorReport = async (): Promise<void> => {
      const response = await getBehaviorReportsByStudent(id)
      setBehaviorReports(response)
      setIsLoading(false)
    }

    void fetchBehaviorReport()
  }, [id])

  return {
    behaviorReports,
    isLoading
  }
}

export default useBehaviorReport
