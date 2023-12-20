/* eslint-disable @typescript-eslint/no-misused-promises */

import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'

interface ProgramFormProps {
  initialValues: {
    name: string
    description: string
  }
  onSubmit: SubmitHandler<FieldValues>
}

function ProgramForm ({ initialValues, onSubmit }: ProgramFormProps): React.ReactElement {
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    reset(initialValues)
  }, [initialValues, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='items-end flex flex-col gap-4'>
      <div className='w-full'>
        <Label htmlFor='name'>Name</Label>
        {
          (initialValues.name.length > 0)
            ? <Input
              id='name'
              type='text'
              placeholder='Name'
              {...register('name')}
            />
            : <Skeleton className='w-full h-10 bg-bg-200' />
        }
      </div>

      <div className='w-full'>
        <Label htmlFor='description'>Description</Label>
        {
          (initialValues.description.length > 0)
            ? <Textarea
              className='h-52 max-h-96'
              id='description'
              placeholder='Description'
              {...register('description')}
            />
            : <Skeleton className='w-full h-52 max-h-96 bg-bg-200' />
        }
      </div>

      <Button type='submit' className='w-full mt-2'>
        Submit
      </Button>
    </form>
  )
}

export default ProgramForm
