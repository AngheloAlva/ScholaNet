/* eslint-disable @typescript-eslint/no-misused-promises */

import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form'
import { format, isValid, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface SemesterFormProps {
  initialValues: {
    name: string
    startDate: string
    endDate: string
  }
  onSubmit: SubmitHandler<FieldValues>
}

function SemesterForm ({ initialValues, onSubmit }: SemesterFormProps): React.ReactElement {
  const { register, handleSubmit, reset } = useForm()
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  useEffect(() => {
    if (isValid(parseISO(initialValues.startDate))) {
      setStartDate(new Date(initialValues.startDate))
    }
    if (isValid(parseISO(initialValues.endDate))) {
      setEndDate(new Date(initialValues.endDate))
    }
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
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'outline'}>
              {
                (startDate != null && isValid(startDate))
                  ? format(startDate, 'PPP')
                  : <Skeleton className='w-full h-6 bg-bg-200' />
              }
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode='single'
              initialFocus
              selected={startDate ?? undefined}
              {...register('startDate')}
              onSelect={(date) => {
                setStartDate(date ?? null)
                reset({ ...initialValues, startDate: date?.toISOString() })
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className='w-full flex flex-col gap-1'>
        <Label htmlFor='endDate'>End Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'outline'}>
              {
                (endDate != null && isValid(endDate))
                  ? format(endDate, 'PPP')
                  : <Skeleton className='w-full h-6 bg-bg-200' />
              }
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode='single'
              initialFocus
              selected={endDate ?? undefined}
              {...register('endDate')}
              onSelect={(date) => {
                setEndDate(date ?? null)
                reset({ ...initialValues, endDate: date?.toISOString() })
              }}
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
