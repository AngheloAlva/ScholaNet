/* eslint-disable @typescript-eslint/no-misused-promises */

import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import type { FieldValues, SubmitHandler } from 'react-hook-form'
import type { User } from '@/types/user/user'

interface CourseInstanceFormProps {
  initialValues: {
    teacher?: User
    classroom: string
    schedule: Array<{
      day: string
      startTime: string
      endTime: string
    }>
  }
  onSubmit: SubmitHandler<FieldValues>
}

function CourseInstanceForm ({ initialValues, onSubmit }: CourseInstanceFormProps): React.ReactElement {
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='items-end flex flex-col gap-4'>
      <div className='w-full'>
        <Label htmlFor='classroom'>Classroom</Label>
        {
          (initialValues.classroom.length > 0)
            ? <Input
              id='classroom'
              type='text'
              placeholder='Classroom'
              {...register('classroom')}
            />
            : <Skeleton className='w-full h-10 bg-bg-200' />
        }
      </div>
      <div className='w-full'>
        <Label htmlFor='schedule'>Schedule</Label>
        {
          (initialValues.schedule.length >= 0)
            ? <Textarea
              id='schedule'
              placeholder='Schedule'
              {...register('schedule')}
            />
            : <Skeleton className='w-full h-10 bg-bg-200' />
        }
      </div>
      {
        (initialValues.teacher != null) && (
          <div className='w-full'>
            <Label htmlFor='teacher'>Teacher</Label>
            {
              (initialValues.teacher?.name.length > 0)
                ? <Input
                  id='teacher'
                  type='text'
                  placeholder='Teacher'
                  {...register('teacher.name')}
                />
                : <Skeleton className='w-full h-10 bg-bg-200' />
            }
          </div>
        )
      }

      <Button type='submit' className='w-full mt-2'>
        Submit
      </Button>
    </form>
  )
}

export default CourseInstanceForm
