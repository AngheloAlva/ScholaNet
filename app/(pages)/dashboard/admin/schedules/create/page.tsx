'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import ScheduleCreator from '@/app/components/dashboard/admin/schedule/Schedule-creator'
import { Button } from '@/app/components/ui/button'
import { FaAngleLeft } from 'react-icons/fa6'

function CreateSchedulePage (): React.ReactElement {
  const [isPageWide, setIsPageWide] = useState<boolean>(false)

  useEffect(() => {
    const checkWidth = (): boolean => window.innerWidth > 1500
    setIsPageWide(checkWidth())

    window.addEventListener('resize', () => {
      setIsPageWide(checkWidth())
    })

    return () => {
      window.removeEventListener('resize', () => {
        setIsPageWide(checkWidth())
      })
    }
  }, [])

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
