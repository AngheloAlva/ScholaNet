/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import type { Control } from 'react-hook-form'
import { format } from 'date-fns'

import { FormControl, FormField, FormItem, FormLabel } from '@/app/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover'
import { CalendarWithYearPicker } from '../ui/calendar-with-year-picker'
import { Button } from '@/app/components/ui/button'
import { FaRegCalendar } from 'react-icons/fa6'

interface CalendarFormFieldProps {
  control: Control<any>
  label: string
  name: string
}

function CalendarFormField ({
  control, label, name
}: CalendarFormFieldProps): React.ReactElement {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant={'outline'}>
                  {field.value
                    ? (format(field.value, 'PPP'))
                    : (<span>Pick a date</span>)}
                  <FaRegCalendar className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent>
              <CalendarWithYearPicker
                mode='single'
                selected={field.value}
                onSelect={(field.onChange)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )} />
  )
}

export default CalendarFormField
