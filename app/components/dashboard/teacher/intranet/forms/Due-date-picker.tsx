/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { format } from 'date-fns'

import { FormControl, FormField, FormItem, FormLabel } from '@/app/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover'
import { Calendar } from '@/app/components/ui/calendar'
import { Button } from '@/app/components/ui/button'
import { FaRegCalendar } from 'react-icons/fa6'

import type { UseFormReturn } from 'react-hook-form'

interface DueDatePickerProps {
  form: UseFormReturn<{
    title: string
    description: string
    dueDate: Date
    type: string
    maxAttempts: number
    duration: number
  }>
}

function DueDatePicker ({
  form
}: DueDatePickerProps): React.ReactElement {
  return (
    <FormField control={form.control} name='dueDate' render={({ field }) => (
      <FormItem className='flex flex-col'>
        <FormLabel>Due Date</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button variant={'outline'}>
                { (field.value)
                  ? (format(field.value, 'PPP '))
                  : (<span className='flex items-center gap-2'>
                      <FaRegCalendar /> Pick start date
                    </span>)
                }
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode='single'
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) =>
                date < new Date()
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </FormItem>
    )} />
  )
}

export default DueDatePicker
