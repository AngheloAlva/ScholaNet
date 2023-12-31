'use client'

import useAttendance from '@/hooks/useAttendance'
import Link from 'next/link'

import DataTable from '@/components/ui/data-table'
import { FaAngleLeft } from 'react-icons/fa6'
import { columns } from './columns'

function AttendanceByStudentPage (
  { params }: { params: { studentId: string } }
): React.ReactElement {
  const { attendances } = useAttendance(params.studentId)

  return (
    <main className='w-screen px-10 mb-20'>
      <Link href={`/dashboard/guardian/student/${params.studentId}`} className='flex items-center gap-2 my-5 font-semibold hover:underline'>
        <FaAngleLeft className='text-lg' /> Go back
      </Link>

      <DataTable columns={columns} data={attendances} />
    </main>
  )
}

export default AttendanceByStudentPage
