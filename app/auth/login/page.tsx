/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useLoginForm } from '@/hooks/useLoginForm'
import { useRouter } from 'next/navigation'
import { login } from '@/api/user/auth'
import { useState } from 'react'
import Cookies from 'js-cookie'
import Link from 'next/link'

import SubmitButton from '@/components/dashboard/admin/forms/Submit-button'
import DialogResetPassword from '@/components/auth/Dialog-reset-password'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import GenericFormField from '@/components/Form-field'
import { useToast } from '@/components/ui/use-toast'
import { Form } from '@/components/ui/form'

import type { loginSchema } from '@/lib/loginSchema'
import type { z } from 'zod'

function LoginPage (): React.ReactElement {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const form = useLoginForm()

  const onSubmit = async (values: z.infer<typeof loginSchema>): Promise<void> => {
    try {
      setIsLoading(true)
      const { token, refreshToken } = await login({ email: values.email, password: values.password })
      Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' })
      Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'strict' })
      toast({
        title: 'Success',
        duration: 3000,
        description: 'You have successfully logged in.'
      })
      router.push('/dashboard')
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
          <h1 className='text-3xl text-text-100 font-bold'>Login</h1>
          <p className='text-sm text-text-200 mb-4'>Enter your email and password to login to your account.</p>
          <GenericFormField control={form.control} name='email' label='Email' placeholder='Email' />
          <GenericFormField control={form.control} name='password' label='Password' placeholder='Password' type='password' />

          <Dialog>
            <DialogTrigger className='text-sm w-fit text-left text-accent-100 hover:underline'>Forgot password?</DialogTrigger>
            <DialogResetPassword />
          </Dialog>

          <SubmitButton text='Sign in' isLoading={isLoading} />
          <p className='text-center text-sm'>
            Don't have an account? {' '}
            <Link href='/auth/register' className='font-semibold text-accent-100 hover:underline'>
              Register
            </Link>
          </p>
        </form>
      </Form>
    </main>
  )
}

export default LoginPage
