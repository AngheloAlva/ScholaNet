/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { useLoginStudentForm } from '@/app/hooks/useLoginStudentForm'
import { loginStudent } from '@/api/user/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Cookies from 'js-cookie'

import RutFormField from '@/app/components/forms/Rut-form-field'
import SubmitButton from '@/app/components/forms/Submit-button'
import BackButton from '@/app/components/ui/Back-button'
import { useToast } from '@/app/components/ui/use-toast'
import { Form } from '@/app/components/ui/form'

import type { loginStudentSchema } from '@/app/lib/loginStudentSchema'
import type { z } from 'zod'
import NumberPasswordField from '@/app/components/forms/Number-password-field'

function LoginUserPage (): React.ReactElement {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const form = useLoginStudentForm()

  const onSubmit = async (values: z.infer<typeof loginStudentSchema>): Promise<void> => {
    try {
      setIsLoading(true)
      const { token, refreshToken, studentId } = await loginStudent({
        rut: values.rut,
        password: values.password
      })
      Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' })
      Cookies.set('refreshToken', refreshToken, { expires: 7, secure: true, sameSite: 'strict' })
      toast({
        title: 'Success',
        duration: 3000,
        description: 'You have successfully logged in.'
      })
      router.push(`/dashboard/student/${studentId}`)
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
            <h1 className='text-3xl text-text-100 font-bold'>Student Access</h1>
            <p className='text-sm text-text-200 mb-4'>Enter your RUT and password to login to your account.</p>
            <RutFormField name='rut' control={form.control} label='RUT' />
            <NumberPasswordField form={form} type='password' />

            <SubmitButton text='Sign in' isLoading={isLoading} />
          </form>
        </div>
      </Form>
    </main>
  )
}

export default LoginUserPage
