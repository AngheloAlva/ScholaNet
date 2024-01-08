/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { type Control, Controller } from 'react-hook-form'
import { format } from 'date-fns'

import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover'
import { Calendar } from '@/app/components/ui/calendar'
import { Button } from '@/app/components/ui/button'
import { FaRegCalendar } from 'react-icons/fa6'

interface DueDateEditSelectProps {
  control: Control<{
    title: string
    description: string
    dueDate: Date
  }>
}

function DueDateEditSelect ({
  control
}: DueDateEditSelectProps): React.ReactElement {
  return (
    <Controller
      control={control}
      name='dueDate'
      render={({ field: { onChange, value } }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'outline'} className='w-full'>
              { (value)
                ? (format(value, 'PPP '))
                : (<span className='flex items-center gap-2'>
                    <FaRegCalendar /> Pick start date
                  </span>)
              }
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode='single'
              selected={value}
              onSelect={onChange}
              disabled={(date) =>
                date < new Date()
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}
    />
  )
}

export default DueDateEditSelect
