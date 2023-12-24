/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { createSemesterSchema } from '@/lib/createSemesterSchema'
import { createSemester } from '@/api/scholanet/semester'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { useState } from 'react'

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FaRegCalendar, FaRegCalendarCheck } from 'react-icons/fa6'
import GenericFormField from '@/components/Form-field'
import { useToast } from '@/components/ui/use-toast'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import SubmitButton from './Submit-button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import type { z } from 'zod'

function CreateSemester (
  { onSemesterCreated }: { onSemesterCreated: () => Promise<void> }
): React.ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof createSemesterSchema>>({
    resolver: zodResolver(createSemesterSchema)
  })

  const onSubmit = async (values: z.infer<typeof createSemesterSchema>): Promise<void> => {
    const formattedStartDate = format(values.startDate, 'MM-dd-yyyy')
    const formattedEndDate = format(values.endDate, 'MM-dd-yyyy')

    try {
      setIsLoading(true)
      await createSemester({
        name: values.name,
        startDate: formattedStartDate,
        endDate: formattedEndDate
      })
      toast({
        title: 'Success',
        duration: 3000,
        description: 'You have successfully created a new semester.'
      })
      await onSemesterCreated()
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast({
        title: 'Error',
        duration: 3000,
        description: (error as any)?.response?.data?.errors.map((error: any) => (
          <p key={error.path}>
            {error.path}: {error.value} - {error.msg}
          </p>
        )) ?? 'An error occurred. Please try again later.'
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Semester</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Semester</DialogTitle>
          <DialogDescription>
            Fill the form below to create a new semester.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField control={form.control} name='startDate' render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={'outline'}>
                        { field.value
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
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )} />
            <FormField control={form.control} name='endDate' render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={'outline'}>
                        { field.value
                          ? (format(field.value, 'PPP'))
                          : (<span className='flex items-center gap-2'>
                              <FaRegCalendarCheck /> Pick end date
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
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )} />
            <GenericFormField name="name" label="Name" placeholder='name' control={form.control} />

            <SubmitButton text='Create Semester' isLoading={isLoading} />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateSemester
