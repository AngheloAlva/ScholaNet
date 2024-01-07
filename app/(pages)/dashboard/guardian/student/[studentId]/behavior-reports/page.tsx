'use client'

import useBehaviorReport from '@/app/hooks/useBehaviorReport'
import { columns } from './columns'
import Link from 'next/link'

import { Skeleton } from '@/app/components/ui/skeleton'
import DataTable from '@/app/components/ui/data-table'
import { FaAngleLeft } from 'react-icons/fa6'

function BehaviorReportPage (
  { params }: { params: { studentId: string } }
): React.ReactElement {
  const { behaviorReports, isLoading } = useBehaviorReport(params.studentId)

  return (
    <main className='w-screen px-10 mb-20'>
      <Link href={`/dashboard/guardian/student/${params.studentId}`} className='flex items-center gap-2 my-5 font-semibold hover:underline'>
        <FaAngleLeft className='text-lg' /> Go back
      </Link>

      {
        isLoading
          ? <Skeleton className='w-full h-96' />
          : <DataTable columns={columns} data={behaviorReports} filterColumn='severity' />
      }
    </main>
  )
}

export default BehaviorReportPage
