/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import GenericFormField from '@/app/components/forms/Form-field'
import { useRegisterForm } from '@/app/hooks/useRegisterForm'
import useAuthStore from '@/app/store/authStore'
import { useRouter } from 'next/navigation'
import { register } from '@/api/user/auth'
import { useState } from 'react'
import Link from 'next/link'

import SubmitButton from '@/app/components/forms/Submit-button'
import { useToast } from '@/app/components/ui/use-toast'
import BackButton from '@/app/components/ui/Back-button'
import { Form } from '@/app/components/ui/form'

import type { registerSchema } from '@/app/lib/registerSchema'
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
    <main className='w-screen h-screen flex justify-center items-center'>
      <Form {...form}>
        <div className='flex flex-col'>
          <BackButton href='/' />
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full bg-bg-200 shadow-lg shadow-bg-300 px-5 py-7 rounded-md flex flex-col gap-3'>
            <h1 className='text-3xl text-text-100 font-bold'>Register</h1>
            <p className='text-sm text-text-200 mb-4'>Please fill in your details to create an account.</p>

            <div className='flex items-center justify-center gap-2 w-full'>
              <GenericFormField control={form.control} name='name' label='Name' placeholder='Name' />
              <GenericFormField control={form.control} name='lastName' label='Last Name' placeholder='Last Name' />
            </div>
            <GenericFormField control={form.control} name='rut' label='Rut' placeholder='Rut' />
            <GenericFormField control={form.control} name='email' label='Email' placeholder='Email' />
            <GenericFormField control={form.control} name='password' label='Password' placeholder='Password' type='password' />

            <SubmitButton text='Sign up' isLoading={isLoading} />
            <p className='text-center text-sm'>
              Already have an account? {' '}
              <Link href='/auth/login' className='font-semibold text-accent-100 hover:underline'>
                Login
              </Link>
            </p>
          </form>
        </div>
      </Form>

    </main>
  )
}

export default RegisterPage
