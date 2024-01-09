'use client'

import useBehaviorReport from '@/app/hooks/useBehaviorReport'
import { columns } from './columns'

import DataTable from '@/app/components/dashboard/guardian/students/attendance/Data-table'
import { Skeleton } from '@/app/components/ui/skeleton'
import BackButton from '@/app/components/ui/Back-button'

function BehaviorReportPage (
  { params }: { params: { studentId: string } }
): React.ReactElement {
  const { behaviorReports, isLoading } = useBehaviorReport(params.studentId)

  return (
    <main className='w-screen px-10 mb-20'>
      <BackButton href={`/dashboard/guardian/student/${params.studentId}`} />

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
