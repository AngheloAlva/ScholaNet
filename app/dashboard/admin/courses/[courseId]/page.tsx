'use client'

import { getCourse, updateCourse } from '@/api/course/course'
import CourseForm from '@/components/dashboard/admin/forms/Course-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import type { Course } from '@/types/course/course'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaAngleLeft } from 'react-icons/fa6'

function CourseByIdPage ({ params }: { params: { courseId: string } }): React.ReactElement {
  const [course, setCourse] = useState<Course>()
  const router = useRouter()

  useEffect(() => {
    const fetchCourse = async (): Promise<void> => {
      const fetchedCourse = await getCourse(params.courseId)
      setCourse(fetchedCourse)
    }

    void fetchCourse()
  }, [params.courseId])

  const handleUpdate = async (updatedData: any): Promise<void> => {
    await updateCourse({ id: course?._id, ...updatedData })
    router.push('/dashboard/admin/courses')
  }

  return (
    <main className='px-5 mb-20 md:px-16 lg:px-32 xl:px-60 2xl:px-80'>
      <Link href={'/dashboard/admin/courses'} className='flex items-center gap-2 my-5 font-semibold hover:underline'>
        <FaAngleLeft className='text-lg' /> Go back
      </Link>
      <Card className='overflow-hidden'>
        <CardHeader>
          <CardTitle className='flex flex-col md:flex-row md:gap-4'>
            {
              ((course?.image) != null)
                ? <Image src={course.image} width={200} height={200} className='rounded-md mb-4' alt='Course image' />
                : <Skeleton className='w-full h-52 max-w-[13rem] bg-bg-200' />
            }
            <div>
              {
                ((course?._id) != null)
                  ? 'Course ID: ' + course?._id
                  : <Skeleton className='w-full h-6 bg-bg-200' />
              }
              <CardDescription className='font-normal'>
                Change fields of the course here
              </CardDescription>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor='program'>Program</Label>
          {
            ((course?.program.name) != null)
              ? <Input id='program' type='text' value={course?.program.name} className='mb-4' disabled />
              : <Skeleton className='w-full h-10 bg-bg-200' />
          }
          <CourseForm
            initialValues={course ?? { title: '', description: '', href: '' }}
            onSubmit={handleUpdate} />
        </CardContent>
      </Card>
    </main>
  )
}

export default CourseByIdPage
