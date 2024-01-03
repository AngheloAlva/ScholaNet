'use client'

import DataCard from '@/components/dashboard/admin/Data-card'
import TableCard from '@/components/dashboard/admin/Table-card'
import { Button } from '@/components/ui/button'
import useScheduleData from '@/hooks/useScheduleData'
import Link from 'next/link'
import { FaCalendar } from 'react-icons/fa6'

function AdminSchedulesPage (): React.ReactElement {
  const { totalSchedules, schedules } = useScheduleData()
  const tableHeader: string[] = ['_id', 'name']
  const tableBody: string[][] = schedules.length === 0
    ? [['No schedules found']]
    : schedules.map(schedule => [
      schedule._id,
      schedule.name
    ])

  return (
    <main className='pt-7 mb-20 flex flex-col gap-5 w-screen px-5 md:px-16 lg:px-32 xl:px-60 2xl:px-80'>
      <DataCard
        title='Total Schedules'
        value={totalSchedules}
        icon={<FaCalendar className='w-4 h-4 text-gray-500 dark:text-gray-400' />}
      />

      <TableCard
        tableBody={tableBody}
        tableHeader={tableHeader}
        title='Schedules' handleClick={() => {}}
      />

      <Link href='/dashboard/admin/schedules/create'>
        <Button className='w-full'>
          Create Schedule
        </Button>
      </Link>
    </main>
  )
}

export default AdminSchedulesPage
