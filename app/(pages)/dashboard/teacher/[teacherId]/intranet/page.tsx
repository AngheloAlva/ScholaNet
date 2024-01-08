'use client'

import useDashboardTeacherData from '@/app/hooks/useDashboardTeacherData'

import CourseCard from '@/app/components/dashboard/teacher/intranet/ui/Course-card'
import { Skeleton } from '@/app/components/ui/skeleton'
import BackButton from '@/app/components/ui/Back-button'

function TeacherIntranetPage (
  { params }: { params: { teacherId: string } }
): React.ReactElement {
  const year = new Date().getFullYear().toString()
  const { courseInstances, schedules, isLoading } = useDashboardTeacherData(params.teacherId, year)

  return (
    <div className='px-5 mb-20'>
      <BackButton href='/dashboard/teacher/' />

      <h1 className='text-2xl font-bold mb-4'>My courses</h1>
      <main className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {
          isLoading
            ? (
                <>
                  <Skeleton className='w-full h-96' />
                  <Skeleton className='w-full h-96' />
                  <Skeleton className='w-full h-96' />
                  <Skeleton className='w-full h-96' />
                </>
              )
            : courseInstances.map((courseInstance) => (
                <CourseCard
                  key={courseInstance._id}
                  name={courseInstance.course.title}
                  description={`Course instance with id ${courseInstance._id}`}
                  classroom={courseInstance.classroom}
                  studentsLength={courseInstance.students.length}
                  schedule={schedules}
                  image={courseInstance.course.image}
                  href={`/dashboard/teacher/${params.teacherId}/intranet/${courseInstance._id}`}
                />
            ))
        }
      </main>
    </div>
  )
}

export default TeacherIntranetPage
