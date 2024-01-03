'use client'

import ScheduleCreator from '@/components/dashboard/admin/schedule/Schedule-creator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FaAngleLeft } from 'react-icons/fa6'

function CreateSchedulePage (): React.ReactElement {
  const isPageWide = window.innerWidth > 1500

  return (
    <>
      <Link href={'/dashboard/admin/course-instances'} className='ml-5 flex items-center gap-2 mt-5 font-semibold hover:underline'>
        <FaAngleLeft className='text-lg' /> Go back
      </Link>

      <main className='flex flex-col items-center justify-center w-full h-full pt-5 mb-20'>
        {
          isPageWide
            ? (
              <ScheduleCreator />
              )
            : (
              <div className='flex flex-col h-[60vh] gap-4 text-center justify-center w-screen px-10'>
                <p className='text-xl font-bold'>
                  This page is not available on this screen size
                </p>

                <Link href='/dashboard/admin/schedules'>
                  <Button className='w-4/6 max-w-sm'>
                    Go back
                  </Button>
                </Link>
              </div>
              )
          }
      </main>
    </>
  )
}

export default CreateSchedulePage
