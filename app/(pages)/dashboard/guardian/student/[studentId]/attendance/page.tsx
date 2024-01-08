'use client'

import useAttendance from '@/app/hooks/useAttendance'
import { columns } from './columns'
import Link from 'next/link'

import DataTable from '@/app/components/dashboard/guardian/students/attendance/Data-table'
import { Skeleton } from '@/app/components/ui/skeleton'
import { FaAngleLeft } from 'react-icons/fa6'

function AttendanceByStudentPage (
  { params }: { params: { studentId: string } }
): React.ReactElement {
  const { attendances, isLoading } = useAttendance(params.studentId)

  return (
    <main className='w-screen px-10 mb-20'>
      <Link href={`/dashboard/guardian/student/${params.studentId}`} className='flex items-center gap-2 my-5 font-semibold hover:underline'>
        <FaAngleLeft className='text-lg' /> Go back
      </Link>

      {
        isLoading
          ? <Skeleton className='w-full h-96' />
          : <DataTable columns={columns} data={attendances} filterColumn='status' />
      }
    </main>
  )
}

export default AttendanceByStudentPage
