'use client'

import Image from 'next/image'
import UserTitle from '@/components/dashboard/User-title'
import { coursesIcons } from '@/data/dashboard-sections'
import CourseIcon from '@/components/dashboard/Course-icon'

function DashboardPage (): React.ReactElement {
  return (
    <>
      <header className='flex flex-col w-screen px-5 bg-bg-200 pb-10 items-center pt-28'>
        <div className='md:flex md: justify-between'>
          <UserTitle />
          <Image src={'/dashboard-intro.png'} alt='Dashboard Presentation' width={768} height={500} className='md:w-96' />
        </div>

        <div className='grid grid-cols-2 gap-2 border-2 p-2 mb-10 rounded-lg mt-10 bg-bg-300 w-full md:grid-cols-4 max-w-4xl'>
          {
            coursesIcons.map((course) => (
              <CourseIcon
                key={course.alt}
                image={course.image}
                alt={course.alt}
                href={course.href}
                buttonText={course.buttonText}
              />
            ))
          }
        </div>
      </header>

      <main className="bg-bg-200 w-screen">
          {/* // TODO: Add view of small part of the sections */}
      </main>
    </>
  )
}

export default DashboardPage
