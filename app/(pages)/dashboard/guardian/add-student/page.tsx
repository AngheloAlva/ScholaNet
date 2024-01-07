/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

'use client'

import { createInscriptionSchema } from '@/app/lib/createInscriptionSchema'
import { createInscription } from '@/api/user/inscription'
import { zodResolver } from '@hookform/resolvers/zod'
import useProgramData from '@/app/hooks/useProgramData'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { jwtDecode } from 'jwt-decode'
import { format } from 'date-fns'
import { useState } from 'react'
import Cookies from 'js-cookie'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import CalendarFormField from '@/app/components/forms/Calendar-form-field'
import GenericFormField from '@/app/components/forms/Form-field'
import RutFormField from '@/app/components/forms/Rut-form-field'
import SubmitButton from '@/app/components/forms/Submit-button'
import { useToast } from '@/app/components/ui/use-toast'
import { Input } from '@/app/components/ui/input'

import type { z } from 'zod'

function AddStudentPage (): React.ReactElement {
  const { programs } = useProgramData()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof createInscriptionSchema>>({
    resolver: zodResolver(createInscriptionSchema)
  })

  const onSubmit = async (values: z.infer<typeof createInscriptionSchema>): Promise<void> => {
    setIsLoading(true)

    const date = format(values.dateOfBirth, 'MM-dd-yyyy')
    const token = Cookies.get('refreshToken')
    const { userId: guardian } = (token != null) ? jwtDecode(token) as { userId: string } : { userId: '' }

    try {
      await createInscription({
        name: values.name,
        lastName: values.lastName,
        rut: values.rut,
        dateOfBirth: date,
        password: values.password,
        program: values.program,
        guardian
      })
      toast({
        title: 'Inscription created',
        description: 'The inscription was created successfully',
        duration: 2000
      })
      setIsLoading(false)
      router.push('/dashboard/guardian')
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as any)?.response?.data?.message ?? 'An error occurred. Please try again later.',
        duration: 3000
      })
      setIsLoading(false)
    }
  }

  return (
    <main className='w-screen pt-7 px-5 pb-20 flex items-center justify-center'>
      <Card className='max-w-xl w-full'>
        <CardHeader>
          <CardTitle>New Inscription</CardTitle>
          <CardDescription>
            Fill the following form to add a new inscription.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
              <GenericFormField control={form.control} label='Student Name' name='name' placeholder='name' />
              <GenericFormField control={form.control} label='Student Last Name' name='lastName' placeholder='last name' />
              <CalendarFormField control={form.control} name='dateOfBirth' label='Student Date of Birth' />
              <FormField
                control={form.control}
                name={'password'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-text-100'>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='1234'
                        type='text'
                        maxLength={4}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '')
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <RutFormField control={form.control} name='rut' label='Student RUT' />
              <FormField
                control={form.control}
                name="program"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          programs.map((program) => (
                            <SelectItem key={program._id} value={program._id}>
                              {program.name}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SubmitButton className='bg-accent-100 hover:bg-[#ce336c]' isLoading={isLoading} text='Add Inscription' />
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}

export default AddStudentPage
