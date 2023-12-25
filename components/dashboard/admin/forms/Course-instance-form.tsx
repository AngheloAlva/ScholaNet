/* eslint-disable @typescript-eslint/no-misused-promises */

import { useFieldArray, useForm } from 'react-hook-form'
import { useEffect } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import type { FieldValues, SubmitHandler } from 'react-hook-form'
import type { User } from '@/types/user/user'
import { Separator } from '@/components/ui/separator'
import TeacherSelect from './Teacher-select'
import SelectField from './Select-field'
import { dayOptions, durationnOptions, startTimes } from '@/app/dashboard/admin/course-instances/create/page'

interface CourseInstanceFormProps {
  initialValues: {
    teacher?: User
    classroom: string
    schedule: Array<{
      day: string
      startTime: string
      endTime: string
      duration: number
    }>
  }
  onSubmit: SubmitHandler<FieldValues>
}

function CourseInstanceForm ({ initialValues, onSubmit }: CourseInstanceFormProps): React.ReactElement {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: initialValues
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'schedule'
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
      {fields.map((field, index) => (
          <div key={field.id} className='w-full gap-4 flex flex-col'>
            <Separator />
            <Label>Schedule {index + 1}</Label>
            {/* <Input {...register(`schedule.${index}.day`)} />
            <Input {...register(`schedule.${index}.startTime`)} />
            <Input {...register(`schedule.${index}.endTime`)} />
            <Input {...register(`schedule.${index}.duration`)} /> */}
            <SelectField
              form={control}
              name={`schedule.${index}.day`}
              options={dayOptions}
              placeholder='Select a day'
              textTransform='capitalize'
              index={field.id}
            />
            <SelectField
              name='startTime'
              form={control}
              options={startTimes}
              placeholder='Select a start time'
              index={field.id}
            />
            <SelectField
              name='duration'
              form={control}
              options={durationnOptions}
              placeholder='Select a duration'
              index={field.id}
            />
            <Input {...register(`schedule.${index}.duration`)} />

            <Button variant={'destructive'} onClick={() => { remove(index) }}>Remove</Button>
          </div>
      ))}
      <Button type='button' className='bg-text-200 w-full' onClick={() => { append({ day: '', startTime: '', endTime: '', duration: 1 }) }}>
        Add Schedule
      </Button>

      <Separator />

      <Button type='submit' className='w-full mt-2'>
        Submit
      </Button>
    </form>
  )
}

export default CourseInstanceForm
