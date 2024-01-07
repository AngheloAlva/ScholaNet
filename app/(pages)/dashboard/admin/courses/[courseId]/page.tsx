'use client'

import { getCourse, updateCourse } from '@/api/course/course'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import CourseForm from '@/app/components/dashboard/admin/forms/Course-form'
import { useToast } from '@/app/components/ui/use-toast'
import { Skeleton } from '@/app/components/ui/skeleton'
import { Label } from '@/app/components/ui/label'
import { Input } from '@/app/components/ui/input'
import { FaAngleLeft } from 'react-icons/fa6'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/app/components/ui/card'

import type { Course } from '@/types/course/course'

function CourseByIdPage ({ params }: { params: { courseId: string } }): React.ReactElement {
  const [course, setCourse] = useState<Course>()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchCourse = async (): Promise<void> => {
      const fetchedCourse = await getCourse(params.courseId)
      setCourse(fetchedCourse)
    }

    void fetchCourse()
  }, [params.courseId])

  const handleUpdate = async (updatedData: any): Promise<void> => {
    try {
      await updateCourse({ id: course?._id, ...updatedData })
      toast({
        title: 'Course updated successfully',
        description: 'The course has been updated successfully.',
        duration: 2000
      })
      router.push('/dashboard/admin/courses')
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as any)?.response?.data?.message ?? 'An error occurred while updating the course.',
        duration: 2000
      })
    }
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
