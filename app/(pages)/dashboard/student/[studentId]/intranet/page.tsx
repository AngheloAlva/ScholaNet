'use client'

import useDashboardStudentData from '@/app/hooks/useDashboardStudentData'

import CourseCard from '@/app/components/dashboard/student/ui/Course-card'
import BackButton from '@/app/components/ui/Back-button'
import { Skeleton } from '@/app/components/ui/skeleton'

function TeacherIntranetPage (
  { params }: { params: { studentId: string } }
): React.ReactElement {
  const { schedules, isLoading } = useDashboardStudentData(params.studentId)

  const courseInstances = schedules?.days.map((day) => (
    day.blocks.map((block) => (
      block.courseInstance
    ))
  )).flat(1)

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
            : courseInstances?.map((courseInstance) => (
                <CourseCard
                  key={courseInstance._id}
                  name={courseInstance.course.title}
                  description={courseInstance.course.description}
                  classroom={courseInstance.classroom}
                  image={courseInstance.course.image}
                  href={`/dashboard/student/intranet/${courseInstance._id}`}
                />
            ))
        }
      </main>
    </div>
  )
}

export default TeacherIntranetPage
