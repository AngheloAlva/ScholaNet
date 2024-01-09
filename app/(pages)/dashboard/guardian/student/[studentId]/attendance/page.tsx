'use client'

import useAttendance from '@/app/hooks/useAttendance'
import { columns } from './columns'

import DataTable from '@/app/components/dashboard/guardian/students/attendance/Data-table'
import BackButton from '@/app/components/ui/Back-button'
import { Skeleton } from '@/app/components/ui/skeleton'

function AttendanceByStudentPage (
  { params }: { params: { studentId: string } }
): React.ReactElement {
  const { attendances, isLoading } = useAttendance(params.studentId)

  return (
    <main className='w-screen px-10 mb-20'>
      <BackButton href={`/dashboard/guardian/student/${params.studentId}`} />

      {
        isLoading
          ? <Skeleton className='w-full h-96' />
          : <DataTable
            columns={columns}
            data={attendances}
            filterColumn='status'
          />
      }
    </main>
  )
}

export default AttendanceByStudentPage
