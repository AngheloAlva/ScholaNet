'use client'

import Link from 'next/link'

import CourseInstanceUpdateForm from '@/app/components/dashboard/admin/forms/Course-instance-update-form'
import CourseInstanceData from '@/app/components/dashboard/admin/page/Course-instance-data'
import { FaAngleLeft } from 'react-icons/fa6'

function CourseInstanceByIdPage ({ params }: { params: { courseInstanceId: string } }): React.ReactElement {
  return (
    <>
      <Link href={'/dashboard/admin/course-instances'} className='ml-5 flex items-center gap-2 mt-5 font-semibold hover:underline'>
        <FaAngleLeft className='text-lg' /> Go back
      </Link>
      <main className='pt-5 px-5 pb-20 grid grid-cols-2 gap-5'>
        <CourseInstanceData courseInstanceId={params.courseInstanceId} />
        <CourseInstanceUpdateForm courseInstanceId={params.courseInstanceId} />
      </main>
    </>
  )
}

export default CourseInstanceByIdPage
