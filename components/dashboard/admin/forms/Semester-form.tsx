/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { useState } from 'react'
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
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: initialValues
  })
  const [startDate, setStartDate] = useState<Date>(new Date(initialValues.startDate))
  const [endDate, setEndDate] = useState<Date>(new Date(initialValues.endDate))

  const handleStartDateSelect = (date: Date): void => {
    if (date) {
      setStartDate(date)
      setValue('startDate', date.toISOString().split('T')[0])
    }
  }

  const handleEndDateSelect = (date: Date): void => {
    if (date) {
      setEndDate(date)
      setValue('endDate', date.toISOString().split('T')[0])
    }
  }

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
              {startDate.toDateString()}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode='single'
              selected={startDate}
              onSelect={(date) => { handleStartDateSelect(date ?? new Date('2024-01-01')) }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className='w-full flex flex-col gap-1'>
        <Label htmlFor='endDate'>End Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'outline'}>
              {endDate.toDateString()}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode='single'
              selected={new Date(initialValues.endDate)}
              onSelect={(date) => { handleEndDateSelect(date ?? new Date('2024-07-01')) }}
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
