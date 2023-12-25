'use client'

import useCourseInstanceData from '@/hooks/useCourseInstanceData'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import TableCard from '@/components/dashboard/admin/Table-card'
import DataCard from '@/components/dashboard/admin/Data-card'
import { Button } from '@/components/ui/button'
import { FiBook } from 'react-icons/fi'

function AdminCoursesPage (): React.ReactElement {
  const router = useRouter()
  const { courseInstances, totalCourseInstances } = useCourseInstanceData()
  const tableHeader: string[] = ['id', 'classroom', 'course', 'schedule', 'teacher', 'students', 'semester', 'academicYear']
  const tableBody: string[][] = courseInstances.length >= 1
    ? courseInstances.map(courseInstance => {
      return [
        courseInstance._id,
        courseInstance.classroom,
        courseInstance.course.title,
        courseInstance.schedule.map(schedule => `${schedule.day} ${schedule.startTime}-${schedule.endTime} - ${schedule.duration} block(s)`).join(', '),
        courseInstance.teacher.name + ' ' + courseInstance.teacher.lastName,
        courseInstance.students.length.toString(),
        courseInstance.academicYear,
        courseInstance.semester.name
      ]
    })
    : [['No hay cursos']]

  const handleCourseClick = (id: string): void => {
    router.push(`/dashboard/admin/course-instances/${id}`)
  }

  return (
    <main className='pt-7 mb-20 flex flex-col gap-5 w-screen px-5 md:px-16 lg:px-32 xl:px-60 2xl:px-80'>
      <DataCard
        icon={<FiBook />}
        title={'Course Instances'}
        value={totalCourseInstances}
      />

      <TableCard tableHeader={tableHeader} handleClick={handleCourseClick} tableBody={tableBody} title='Courses' />

      <Link href={'/dashboard/admin/course-instances/create'}>
        <Button className='w-full'>
          Create Course Instance
        </Button>
      </Link>
    </main>
  )
}

export default AdminCoursesPage
