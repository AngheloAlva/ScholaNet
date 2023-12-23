'use client'

/* eslint-disable @typescript-eslint/no-misused-promises */

import { createCourseInstanceSchema } from '@/lib/createCourseInstanceSchema'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { createCourseInstance } from '@/api/course/course-instance'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import SemesterSelect from '@/components/dashboard/admin/forms/Semester-select'
import CourseSelect from '@/components/dashboard/admin/forms/Course-select'
import { Form, FormControl } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import AuthFormField from '@/components/Form-field'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

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
    console.log(values)
    setIsLoading(true)

    if (values.schedule.length === 0) {
      toast({
        title: 'Error',
        duration: 3000,
        description: 'You must add at least one schedule.'
      })
      setIsLoading(false)
      return
    }

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
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full pt-5 px-5 pb-20'>
        <div className='flex flex-col md:flex-row md:gap-5'>
          <div className='w-full flex flex-col gap-2'>
            <AuthFormField label='Academic Year' name='academicYear' placeholder='2024' control={form.control} />
            <AuthFormField label='Classroom' name='classroom' placeholder='Classroom 1A' control={form.control} />
            <div className='flex flex-col gap-2 mt-1'>
              <Label>Course</Label>
              <CourseSelect onChange={handleCourseChange} value={form.watch('course')} />
            </div>
            <div className='flex flex-col gap-2 mt-1'>
              <Label>Semester</Label>
              <SemesterSelect value={form.watch('semester')} onChange={(semester: string) => { form.setValue('semester', semester) }} />
            </div>
            <AuthFormField label='Teacher' name='teacher' placeholder='Teacher' control={form.control} />
          </div>
          <Separator className='mt-4 md:hidden' />
          <div className='flex flex-col w-full gap-5'>

            {
              fields.map((field, index) => (
                <div key={field.id} className='flex flex-col gap-4 w-full'>
                  <Label>Schedule {index + 1}</Label>
                  <Controller
                    control={form.control}
                    name={`schedule.${index}.day`}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a day' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dayOptions.map(day => (
                            <SelectItem key={day} value={day}>
                              {day.charAt(0).toUpperCase() + day.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name={`schedule.${index}.startTime`}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a start time' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {startTimes.map(startTime => (
                            <SelectItem key={startTime} value={startTime}>
                              {startTime}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <Controller
                    control={form.control}
                    name={`schedule.${index}.duration`}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a duration' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {durationnOptions.map(duration => (
                            <SelectItem key={duration} value={duration}>
                              {duration} block{duration === '1' ? '' : 's'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
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
          <Button type='submit'>
            {
              isLoading
                ? <div className='lds-ring'><div /><div /><div /><div /></div>
                : 'Create Program'
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateCourseInstancePage
