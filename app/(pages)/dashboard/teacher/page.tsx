'use client'

import useDashboardTeacherData from '@/app/hooks/useDashboardTeacherData'
import { getUserIdFromToken } from '@/app/lib/getUserIdFromToken'
import useTeacherById from '@/app/hooks/useTeacherById'
import Link from 'next/link'

import TableDataSection from '@/app/components/dashboard/teacher/page/Table-data-section'
import InfoCard from '@/app/components/dashboard/guardian/students/Info-card'
import { Skeleton } from '@/app/components/ui/skeleton'
import { Button } from '@/app/components/ui/button'
import { FaCalendarDays } from 'react-icons/fa6'

function TeacherDashboardPage (): React.ReactElement {
  const userId = getUserIdFromToken()
  const year = new Date().getFullYear().toString()
  const { courseInstances, schedules, evaluations } = useDashboardTeacherData(userId, year)
  const { teacher, attendance, isLoading } = useTeacherById(userId)

  return (
    <main className="flex flex-col gap-6 mb-20 p-4 md:gap-8 md:p-10">
      <InfoCard
        icon={<FaCalendarDays className='w-4 h-4 text-gray-500' />}
        description='of 180 days'
        title='Attendance'
        href={`/dashboard/guardian/student/${teacher?._id}/attendance`}
      >
        {
          isLoading
            ? <Skeleton className='w-16 h-8' />
            : `${attendance.toFixed(2)} %`
        }
      </InfoCard>

      <Link href={`/dashboard/teacher/${teacher?._id}/intranet`} className='w-full flex justify-center'>
        <Button className='w-full md:w-2/3 bg-accent-100 hover:opacity-80 hover:bg-accent-100'>Go to Intranet</Button>
      </Link>

      <TableDataSection
        courseInstances={courseInstances}
        evaluations={evaluations}
        schedules={schedules}
      />
    </main>
  )
}

export default TeacherDashboardPage
