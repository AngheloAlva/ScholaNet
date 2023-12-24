'use client'

/* eslint-disable @typescript-eslint/no-misused-promises */

import { createCourseInstanceSchema } from '@/lib/createCourseInstanceSchema'
import { createCourseInstance } from '@/api/course/course-instance'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

import SemesterSelect from '@/components/dashboard/admin/forms/Semester-select'
import TeacherSelect from '@/components/dashboard/admin/forms/Teacher-select'
import CourseSelect from '@/components/dashboard/admin/forms/Course-select'
import SubmitButton from '@/components/dashboard/admin/forms/Submit-button'
import SelectField from '@/components/dashboard/admin/forms/Select-field'
import GenericFormField from '@/components/Form-field'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { FaAngleLeft } from 'react-icons/fa6'
import { Label } from '@/components/ui/label'
import { Form } from '@/components/ui/form'

import type { z } from 'zod'

export const dayOptions = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
export const startTimes = ['8:30', '9:30', '10:30', '11:30', '12:30', '13:30', '14:30']
export const durationnOptions = ['1', '2', '3']

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
      schedule: [{
        day: '',
        duration: '',
        startTime: ''
      }],
      semester: '',
      teacher: ''
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'schedule'
  })

  const calculateEndTime = (startTime: string, durationBlocks: number): string => {
    const [hours, minutes] = startTime.split(':').map(Number)
    const startTimeInMinutes = hours * 60 + minutes

    const totalDurationInMinutes = durationBlocks * 45 + (durationBlocks - 1) * 10
    const endTimeInMinutes = startTimeInMinutes + totalDurationInMinutes

    const endHours = Math.floor(endTimeInMinutes / 60)
    const endMinutes = endTimeInMinutes % 60

    return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`
  }

  const onSubmit = async (values: z.infer<typeof createCourseInstanceSchema>): Promise<void> => {
    setIsLoading(true)

    try {
      await createCourseInstance({
        academicYear: Number(values.academicYear),
        classroom: values.classroom,
        course: values.course,
        semester: values.semester,
        teacher: values.teacher,
        schedule: values.schedule.map((schedule) => ({
          day: schedule.day,
          startTime: schedule.startTime,
          endTime: calculateEndTime(schedule.startTime, Number(schedule.duration))
        }))
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
          <Separator className='my-4 md:hidden' />
          <div className='flex flex-col w-full gap-5'>

            {
              fields.map((field, index) => (
                <div key={field.id} className='flex flex-col gap-4 w-full'>
                  <Label>Schedule {index + 1}</Label>
                  <SelectField
                    name={`schedule.${index}.day`}
                    placeholder='Select a day'
                    textTransform='capitalize'
                    options={dayOptions}
                    index={field.id}
                    form={form}
                  />
                  <SelectField
                    name={`schedule.${index}.startTime`}
                    placeholder='Select a start time'
                    options={startTimes}
                    index={field.id}
                    form={form}
                  />
                  <SelectField
                    name={`schedule.${index}.duration`}
                    placeholder='Select a duration'
                    options={durationnOptions}
                    textTransform='block'
                    index={field.id}
                    form={form}
                  />
                  <Button type='button' variant={'destructive'} onClick={() => { remove(index) }}>
                    Remove schedule
                  </Button>
                </div>
              ))
            }
            <Button type='button' variant={'secondary'} className='hover:bg-text-100 bg-text-200 text-bg-100' onClick={() => { append({ day: '', startTime: '', duration: '' }) }}>
              Add schedule
            </Button>
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
