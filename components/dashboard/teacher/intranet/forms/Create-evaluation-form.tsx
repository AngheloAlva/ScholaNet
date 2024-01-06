/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import GenericFormField from '@/components/Form-field'
import SelectField from '@/components/dashboard/admin/forms/Select-field'
import SubmitButton from '@/components/dashboard/admin/forms/Submit-button'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { createEvaluationSchema } from '@/lib/createEvaluationSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { FaRegCalendar } from 'react-icons/fa6'
import type { z } from 'zod'

interface CreateEvaluationFormProps {
  onSubmit: (values: z.infer<typeof createEvaluationSchema>) => Promise<void>
  isLoading: boolean
}

function CreateEvaluationForm (
  { onSubmit, isLoading }: CreateEvaluationFormProps
): React.ReactElement {
  const form = useForm<z.infer<typeof createEvaluationSchema>>({
    resolver: zodResolver(createEvaluationSchema)
  })
  const selectOptions = ['paper', 'online', 'presentation', 'project']

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-2'>
        <GenericFormField control={form.control} name='title' label='Title' placeholder='title' />
        <GenericFormField control={form.control} name='description' label='Description' placeholder='description' />

        <div className='space-y-2'>
          <Label>Type</Label>
          <SelectField
            textTransform='capitalize'
            options={selectOptions}
            placeholder='Type'
            form={form}
            name='type'
          />
        </div>

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

        <SubmitButton text='Create Evaluation' isLoading={isLoading} />
      </form>
    </Form>
  )
}

export default CreateEvaluationForm
