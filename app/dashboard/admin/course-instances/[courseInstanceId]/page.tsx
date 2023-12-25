'use client'

import { getCourseInstance, updateCourseInstance } from '@/api/course/course-instance'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Skeleton } from '@/components/ui/skeleton'
import { FaAngleLeft } from 'react-icons/fa6'

import type { CourseInstance } from '@/types/course/course-instance'
import CourseInstanceForm from '@/components/dashboard/admin/forms/Course-instance-form'

function CourseInstanceByIdPage ({ params }: { params: { courseInstanceId: string } }): React.ReactElement {
  const [courseInstance, setCourseInstance] = useState<CourseInstance>()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchCourseInstance = async (): Promise<void> => {
      const fetchedCourseInstance = await getCourseInstance(params.courseInstanceId)
      setCourseInstance(fetchedCourseInstance)
    }

    void fetchCourseInstance()
  }, [params.courseInstanceId])

  const handleUpdate = async (updatedData: any): Promise<void> => {
    try {
      await updateCourseInstance({ id: courseInstance?._id, ...updatedData })
      toast({
        title: 'Course Instance updated successfully',
        description: 'The course instance has been updated successfully',
        duration: 2000
      })
      router.push('/dashboard/admin/course-instances')
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as any)?.response?.data?.message ?? 'An error occurred while updating the course instance.',
        duration: 2000
      })
    }
  }

  return (
    <main className='px-5 mb-20 md:px-16 lg:px-32 xl:px-60 2xl:px-80'>
      <Link href={'/dashboard/admin/course-instances'} className='flex items-center gap-2 my-5 font-semibold hover:underline'>
        <FaAngleLeft className='text-lg' /> Go back
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>
            {
              ((courseInstance?._id) != null)
                ? 'Course Instance ID: ' + courseInstance?._id
                : <Skeleton className='w-full h-6 bg-bg-200' />
            }
          </CardTitle>
          <CardDescription>
            Change the name and description of the program here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CourseInstanceForm
            onSubmit={handleUpdate}
            initialValues={courseInstance ?? {
              classroom: '',
              schedule: [{
                day: '',
                startTime: '',
                endTime: '',
                duration: 1
              }]
            }}
          />
        </CardContent>
      </Card>
    </main>
  )
}

export default CourseInstanceByIdPage
