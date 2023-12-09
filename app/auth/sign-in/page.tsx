/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { login } from '@/api/user/auth'
import Link from 'next/link'

const signInSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string().min(1, { message: 'Please enter a password' })
})

function SignInPage (): React.ReactElement {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof signInSchema>): Promise<void> => {
    try {
      const { token, refreshToken } = await login({ email: values.email, password: values.password })
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
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-5/6 bg-bg-200 p-5 rounded-md flex flex-col gap-4'>
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
          <Button type='submit' className='mt-4 w-full'>
            Sign In
          </Button>
          <p className='text-center text-sm'>
            Don't have an account? {' '}
            <Link href='/auth/sign-up' className='font-semibold hover:underline'>
              Sign Up
            </Link>
          </p>
        </form>
      </Form>
    </main>
  )
}

export default SignInPage
