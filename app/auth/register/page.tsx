'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Link from 'next/link'
import { z } from 'zod'

import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { register } from '@/api/user/auth'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const registerSchema = z.object({
  name: z.string().min(3, { message: 'Please enter your name' }),
  lastName: z.string().min(3, { message: 'Please enter your last name' }),
  rut: z.string().min(9, { message: 'Please enter your rut' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string().min(6, { message: 'Please enter a password' })
})

function RegisterPage (): React.ReactElement {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      lastName: '',
      rut: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof registerSchema>): Promise<void> => {
    try {
      setIsLoading(true)
      const { user } = await register({
        name: values.name,
        lastName: values.lastName,
        rut: values.rut,
        email: values.email,
        password: values.password
      })
    } catch (error) {
      toast({
        title: 'Error',
        duration: 4000,
        description: (error as any)?.response?.data?.message ?? 'An error occurred. Please try again later.'
      })
    }
  }

  return (
    <main className='w-screen h-screen flex items-center justify-center'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-5/6 bg-bg-200 px-5 py-7 rounded-md flex flex-col gap-3'>
          <h1 className='text-3xl font-bold'>Register</h1>
          <p className='text-sm text-accent-200 mb-4'>Please fill in your details to create an account.</p>

          <div className='flex items-center justify-center gap-2 w-full'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Last Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='rut'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rut</FormLabel>
                <FormControl>
                  <Input placeholder='Rut' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full mt-7'>
            {
              isLoading
                ? <div className='lds-ring'><div /><div /><div /><div /></div>
                : 'Sign Up'
            }
          </Button>
          <p className='text-center text-sm'>
            Already have an account? {' '}
            <Link href='/auth/login' className='font-semibold text-blue-500 hover:underline'>
              Login
            </Link>
          </p>
        </form>
      </Form>

    </main>
  )
}

export default RegisterPage
