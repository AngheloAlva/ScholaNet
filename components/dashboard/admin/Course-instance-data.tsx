import { useEffect, useState } from 'react'

import { getCourseInstance } from '@/api/course/course-instance'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import type { CourseInstance } from '@/types/course/course-instance'

function CourseInstanceData ({
  courseInstanceId
}: { courseInstanceId: string }): React.ReactElement {
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
      refreshToken: '',
      students: []
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
    schedule: ''
  })

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      const data = await getCourseInstance(courseInstanceId)
      setCurrentData(data)
    }

    void loadData()
  }, [courseInstanceId])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Instance Data</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Course: </strong> {currentData.course.title}</p>
        <p><strong>Teacher: </strong> {currentData.teacher.name}</p>
        <p><strong>Semester: </strong> {currentData.semester.name}</p>
        <p><strong>Year: </strong> {currentData.academicYear}</p>
        <p><strong>Classroom: </strong> {currentData.classroom}</p>
        <p><strong>Schedule: </strong></p>
      </CardContent>
    </Card>
  )
}

export default CourseInstanceData
