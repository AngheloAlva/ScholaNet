/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useLoginForm } from '@/hooks/useLoginForm'
import useAuthStore from '@/app/store/authStore'
import { useRouter } from 'next/navigation'
import { login } from '@/api/user/auth'
import { useState } from 'react'
import Link from 'next/link'

import AuthFormField from '@/components/auth/Auth-form-field'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
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
      useAuthStore.getState().setTokens(token, refreshToken)
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
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-5/6 bg-bg-200 px-5 py-7 rounded-md flex flex-col gap-3'>
          <h1 className='text-3xl font-bold'>Login</h1>
          <p className='text-sm text-accent-200 mb-4'>Enter your email and password to login to your account.</p>
          <AuthFormField control={form.control} name='email' label='Email' placeholder='Email' />
          <AuthFormField control={form.control} name='password' label='Password' placeholder='Password' type='password' />

          <Link href='/auth/forgot-password' className='text-sm w-fit text-left text-blue-500 hover:underline'>
            Forgot password?
          </Link>
          <Button type='submit' className='w-full mt-2' disabled={isLoading}>
            {
              isLoading
                ? <div className='lds-ring'><div /><div /><div /><div /></div>
                : 'Sign In'
            }
          </Button>
          <p className='text-center text-sm'>
            Don't have an account? {' '}
            <Link href='/auth/register' className='font-semibold text-blue-500 hover:underline'>
              Register
            </Link>
          </p>
        </form>
      </Form>
    </main>
  )
}

export default LoginPage
