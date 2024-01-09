'use client'

import { columns } from '../../guardian/student/[studentId]/behavior-reports/columns'
import { getUserIdFromToken } from '@/app/lib/getUserIdFromToken'
import useBehaviorReport from '@/app/hooks/useBehaviorReport'

import DataTable from '@/app/components/dashboard/guardian/students/attendance/Data-table'
import BackButton from '@/app/components/ui/Back-button'
import { Skeleton } from '@/app/components/ui/skeleton'

function BehaviorReportPage (): React.ReactElement {
  const studentId = getUserIdFromToken()
  const { behaviorReports, isLoading } = useBehaviorReport(studentId)

  return (
    <main className='w-screen px-10 mb-20'>
      <BackButton href='/dashboard/student' />

      {
        isLoading
          ? <Skeleton className='w-full h-96' />
          : <DataTable
              columns={columns}
              data={behaviorReports}
              filterColumn='severity'
            />
      }
    </main>
  )
}

export default BehaviorReportPage
