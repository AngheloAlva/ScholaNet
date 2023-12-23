'use client'

import useCourseData from '@/hooks/useCourseData'
import { useRouter } from 'next/navigation'

import CreateCourse from '@/components/dashboard/admin/forms/Create-course'
import TableCard from '@/components/dashboard/admin/Table-card'
import DataCard from '@/components/dashboard/admin/Data-card'
import { FiBook } from 'react-icons/fi'

function AdminCoursesPage (): React.ReactElement {
  const router = useRouter()
  const { courses, reloadCourses, totalCourses } = useCourseData()
  const tableHeader: string[] = ['id', 'title', 'description', 'program']
  const tableBody: string[][] = courses.length >= 1
    ? courses.map(course => {
      return [
        course._id,
        course.title,
        course.description,
        course.program.name
      ]
    })
    : [['No hay cursos']]

  const handleCourseClick = (id: string): void => {
    router.push(`/dashboard/admin/courses/${id}`)
  }

  return (
    <main className='pt-7 mb-20 flex flex-col gap-5 w-screen px-5 md:px-16 lg:px-32 xl:px-60 2xl:px-80'>
      <DataCard
        icon={<FiBook />}
        title={'Courses'}
        value={totalCourses}
      />

      <TableCard tableHeader={tableHeader} handleClick={handleCourseClick} tableBody={tableBody} title='Courses' />

      <CreateCourse onProgramCreated={reloadCourses} />
    </main>
  )
}

export default AdminCoursesPage
