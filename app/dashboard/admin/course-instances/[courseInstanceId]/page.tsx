'use client'

import { getCourseInstance } from '@/api/course/course-instance'
import CourseInstanceData from '@/components/dashboard/admin/Course-instance-data'
import { useEffect, useState } from 'react'

import type { CourseInstance } from '@/types/course/course-instance'
import CourseInstanceUpdateForm from '@/components/dashboard/admin/forms/Course-instance-update-form'

function CourseInstanceByIdPage ({ params }: { params: { courseInstanceId: string } }): React.ReactElement {
  const [currentData, setCurrentData] = useState<CourseInstance>({
    _id: '',
    course: {
      title: '',
      description: '',
      _id: '',
      program: {
        _id: '',
        name: '',
        description: '',
        courses: []
      },
      image: '',
      href: ''
    },
    teacher: {
      _id: '',
      name: '',
      lastName: '',
      rut: '',
      email: '',
      password: '',
      role: 'teacher',
      state: 'active',
      verificationCode: '',
      emailVerified: false,
      refreshToken: ''
    },
    students: [],
    semester: {
      _id: '',
      name: '',
      startDate: '',
      endDate: ''
    },
    academicYear: '',
    classroom: '',
    schedule: []
  })

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      const data = await getCourseInstance(params.courseInstanceId)
      setCurrentData(data)
    }

    void loadData()
  }, [params.courseInstanceId])

  const onSubmit = (): void => {
    console.log('submitted')
  }

  return (
    <main className='pt-5 px-5 pb-20 grid grid-cols-2 gap-5'>
      <CourseInstanceData data={currentData} />
      <CourseInstanceUpdateForm courseInstanceId={params.courseInstanceId} onSubmit={onSubmit} />
    </main>
  )
}

export default CourseInstanceByIdPage
