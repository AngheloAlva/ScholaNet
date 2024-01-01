'use client'

/* eslint-disable @typescript-eslint/no-misused-promises */

import { createCourseInstanceSchema } from '@/lib/createCourseInstanceSchema'
import { createCourseInstance } from '@/api/course/course-instance'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Link from 'next/link'

import SemesterSelect from '@/components/dashboard/admin/forms/Semester-select'
import TeacherSelect from '@/components/dashboard/admin/forms/Teacher-select'
import CourseSelect from '@/components/dashboard/admin/forms/Course-select'
import SubmitButton from '@/components/dashboard/admin/forms/Submit-button'
import GenericFormField from '@/components/Form-field'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { FaAngleLeft } from 'react-icons/fa6'
import { Form } from '@/components/ui/form'

import type { z } from 'zod'

function CreateCourseInstancePage (): React.ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(createCourseInstanceSchema),
    defaultValues: {
      academicYear: '',
      classroom: '',
      course: '',
      semester: '',
      teacher: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof createCourseInstanceSchema>): Promise<void> => {
    setIsLoading(true)

    try {
      await createCourseInstance({
        academicYear: Number(values.academicYear),
        classroom: values.classroom,
        course: values.course,
        semester: values.semester,
        teacher: values.teacher
      })
      toast({
        title: 'Success',
        duration: 3000,
        description: 'You have successfully created a new course instance.'
      })

      setIsLoading(false)
      router.push('/dashboard/admin/course-instances')
    } catch (error) {
      toast({
        title: 'Error',
        duration: 3000,
        description: (error as any)?.response?.data?.message ?? 'An error occurred. Please try again later.'
      })
    }
  }

  const handleCourseChange = (course: string): void => {
    form.setValue('course', course)
  }

  return (
    <Form {...form}>
      <Link href={'/dashboard/admin/course-instances'} className='ml-5 flex items-center gap-2 mt-5 font-semibold hover:underline'>
        <FaAngleLeft className='text-lg' /> Go back
      </Link>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full pt-5 px-5 pb-20'>
        <div className='flex flex-col md:flex-row md:gap-5'>
          <div className='w-full flex flex-col gap-2'>
            <GenericFormField label='Academic Year' name='academicYear' placeholder='2024' control={form.control} />
            <GenericFormField label='Classroom' name='classroom' placeholder='Classroom 1A' control={form.control} />
            <CourseSelect label='Course' onChange={handleCourseChange} value={form.watch('course')} />
            <SemesterSelect label='Semester' value={form.watch('semester')} onChange={(semester: string) => { form.setValue('semester', semester) }} />
            <TeacherSelect label='Teacher' value={form.watch('teacher')} onChange={(teacher: string) => { form.setValue('teacher', teacher) }} />
          </div>
        </div>
        <div className='flex flex-col'>
          <Separator className='my-5' />
          <SubmitButton text='Create Course Instance' isLoading={isLoading} />
        </div>
      </form>
    </Form>
  )
}

export default CreateCourseInstancePage
