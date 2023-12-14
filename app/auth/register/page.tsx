/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import AuthFormField from '@/components/auth/Auth-form-field'
import { useRegisterForm } from '@/hooks/useRegisterForm'
import useAuthStore from '@/app/store/authStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { register } from '@/api/user/auth'
import { Form } from '@/components/ui/form'

import type { registerSchema } from '@/lib/registerSchema'
import type { z } from 'zod'

function RegisterPage (): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const form = useRegisterForm()
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof registerSchema>): Promise<void> => {
    try {
      setIsLoading(true)
      const user = await register({
        name: values.name,
        lastName: values.lastName,
        rut: values.rut,
        email: values.email,
        password: values.password
      })
      useAuthStore.getState().setEmail(user.email)
      router.push('/auth/register/verify')
    } catch (error) {
      setIsLoading(false)
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
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-5/6 bg-bg-200 shadow-lg shadow-bg-300 px-5 py-7 rounded-md flex flex-col gap-3'>
          <h1 className='text-3xl text-text-100 font-bold'>Register</h1>
          <p className='text-sm text-text-200 mb-4'>Please fill in your details to create an account.</p>

          <div className='flex items-center justify-center gap-2 w-full'>
            <AuthFormField control={form.control} name='name' label='Name' placeholder='Name' />
            <AuthFormField control={form.control} name='lastName' label='Last Name' placeholder='Last Name' />
          </div>
          <AuthFormField control={form.control} name='rut' label='Rut' placeholder='Rut' />
          <AuthFormField control={form.control} name='email' label='Email' placeholder='Email' />
          <AuthFormField control={form.control} name='password' label='Password' placeholder='Password' type='password' />

          <Button type='submit' className='w-full mt-7' disabled={isLoading}>
            {
              isLoading
                ? <div className='lds-ring'><div /><div /><div /><div /></div>
                : 'Sign Up'
            }
          </Button>
          <p className='text-center text-sm'>
            Already have an account? {' '}
            <Link href='/auth/login' className='font-semibold text-accent-100 hover:underline'>
              Login
            </Link>
          </p>
        </form>
      </Form>

    </main>
  )
}

export default RegisterPage
