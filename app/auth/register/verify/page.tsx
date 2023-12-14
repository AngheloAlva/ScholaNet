/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import useAuthStore from '@/app/store/authStore'
import { Button } from '@/components/ui/button'
import { verifyEmail } from '@/api/user/auth'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

function VerifyEmailPage (): React.ReactElement {
  const email = useAuthStore.getState().email
  const [isVerified, setIsVerified] = useState(false)
  const [code, setCode] = useState('')
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (email.length === 0 && !isVerified) {
      toast({
        title: 'Error',
        duration: 4000,
        description: 'You must register first.'
      })
      router.push('/auth/register')
    }
  }, [email, router, toast, isVerified])

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    event.preventDefault()
    try {
      const response = await verifyEmail({ email, code })
      setIsVerified(true)
      Cookies.set('token', response.token, { expires: 7, secure: true, sameSite: 'strict' })
      Cookies.set('refreshToken', response.refreshToken, { expires: 7, secure: true, sameSite: 'strict' })
      toast({
        title: 'Success',
        duration: 3000,
        description: 'You have successfully verified your email.'
      })
      useAuthStore.getState().clearEmail()
      router.push('/dashboard')
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
      <Card className='bg-bg-200 shadow-lg shadow-bg-300'>
        <CardHeader>
          <CardTitle>Validation Form</CardTitle>
          <CardDescription>Please enter the 6-digit code to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="code">6-Digit Code</Label>
              <Input
                id="code"
                maxLength={6}
                placeholder="Enter your code"
                type="text"
                autoComplete='none'
                onChange={(e) => {
                  setCode(e.target.value)
                }}
              />
            </div>
            <Button
              type="submit"
              onClick={async (e) => {
                await handleSubmit(e)
              }}
            >
              Validate
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

export default VerifyEmailPage
