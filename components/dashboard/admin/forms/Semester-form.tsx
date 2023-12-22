/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { useEffect } from 'react'
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form'

interface SemesterFormProps {
  initialValues: {
    name: string
    startDate: string
    endDate: string
  }
  onSubmit: SubmitHandler<FieldValues>
}

function SemesterForm ({ initialValues, onSubmit }: SemesterFormProps): React.ReactElement {
  const { register, handleSubmit, reset } = useForm({
  })

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
              defaultValue={initialValues.name}
            />
            : <Skeleton className='w-full h-10 bg-bg-200' />
        }
      </div>
      <div className='w-full flex flex-col gap-1'>
        <Label htmlFor='startDate'>Start Date</Label>
        <Input type='text' value={initialValues.startDate} disabled/>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'outline'}>
              {
                (initialValues.startDate.length > 0)
                  ? initialValues.startDate
                  : <Skeleton className='w-full h-6 bg-bg-200' />
              }
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode='single'
              selected={new Date(initialValues.startDate)}
              initialFocus
              {...register('startDate')}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className='w-full flex flex-col gap-1'>
        <Label htmlFor='endDate'>End Date</Label>
        <Input type='text' value={initialValues.endDate} disabled/>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'outline'}>
              {
                (initialValues.endDate.length > 0)
                  ? initialValues.endDate
                  : <Skeleton className='w-full h-6 bg-bg-200' />
              }
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode='single'
              selected={new Date(initialValues.endDate)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Button type='submit' className='w-full mt-2'>
        Submit
      </Button>
    </form>
  )
}

export default SemesterForm
