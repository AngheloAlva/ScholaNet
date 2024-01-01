/* eslint-disable @typescript-eslint/no-misused-promises */

import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import type { FieldValues, SubmitHandler } from 'react-hook-form'
import type { User } from '@/types/user/user'
import TeacherSelect from './Teacher-select'

interface CourseInstanceFormProps {
  initialValues: {
    teacher?: User
    classroom: string
  }
  onSubmit: SubmitHandler<FieldValues>
}

function CourseInstanceForm ({ initialValues, onSubmit }: CourseInstanceFormProps): React.ReactElement {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialValues
  })

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
      <div className="w-full">
        <TeacherSelect
        label='Teacher'
        value={initialValues.teacher?._id ?? ''}
        onChange={(teacherId) => { reset({ ...initialValues, teacher: { _id: teacherId } }) }}
        />
      </div>

      <Button type='submit' className='w-full mt-2'>
        Submit
      </Button>
    </form>
  )
}

export default CourseInstanceForm
