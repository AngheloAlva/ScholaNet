/* eslint-disable @typescript-eslint/no-misused-promises */

import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form'
import { useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

interface CourseFormProps {
  initialValues: {
    title: string
    description: string
    href: string
  }
  onSubmit: SubmitHandler<FieldValues>
}

function CourseForm ({ initialValues, onSubmit }: CourseFormProps): React.ReactElement {
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='items-end flex flex-col gap-4'>
      <div className='w-full'>
        <Label htmlFor='title'>Title</Label>
        {
          (initialValues.title.length > 0)
            ? <Input
              id='title'
              type='text'
              placeholder='Title'
              {...register('title')}
            />
            : <Skeleton className='w-full h-10 bg-bg-200' />
        }
      </div>
      <div className='w-full'>
        <Label htmlFor='description'>Description</Label>
        {
          (initialValues.description.length > 0)
            ? <Input
              id='description'
              type='text'
              placeholder='Description'
              {...register('description')}
            />
            : <Skeleton className='w-full h-10 bg-bg-200' />
        }
      </div>
      <div className='w-full'>
        <Label htmlFor='href'>Href</Label>
        {
          (initialValues.href.length > 0)
            ? <Input
              id='href'
              type='text'
              placeholder='Href'
              {...register('href')}
            />
            : <Skeleton className='w-full h-10 bg-bg-200' />
        }
      </div>
      <Button type='submit' className='w-full mt-2'>
        Submit
      </Button>
    </form>
  )
}

export default CourseForm
