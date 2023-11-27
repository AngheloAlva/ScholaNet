import Image from 'next/image'
import UserTitle from '@/components/dashboard/User-title'
import CourseSection from '@/components/home/Course-section'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { coursesSections } from '@/data/home-sections'
import { coursesIcons } from '@/data/dashboard-sections'
import CourseIcon from '@/components/dashboard/Course-icon'

function DashboardPage (): React.ReactElement {
  return (
    <>
      <div className='flex flex-col w-screen px-5 py-10'>
        <UserTitle />
        <Image src={'/dashboard-intro.png'} alt='Dashboard Presentation' width={1000} height={500} />

        <div className='grid grid-cols-2 gap-2 border-2 p-2 rounded-lg mt-10 bg-bg-300 w-full'>
          {
            coursesIcons.map((course) => (
              <CourseIcon
                key={course.alt}
                image={course.image}
                alt={course.alt}
                buttonText={course.buttonText}
              />
            ))
          }
        I</div>
      </div>

      <div className='flex flex-col items-center'>
        {
          coursesSections.map((section) => (
            <>
              <CourseSection
                key={section.title}
                title={section.title}
                description={section.description}
                courses={section.courses}
              />
              <Button key={section.title} className='mb-10 text-xl w-5/6'>
                Inscription
              </Button>
              <Separator key={section.title} />
            </>
          ))
        }
      </div>
    </>
  )
}

export default DashboardPage
