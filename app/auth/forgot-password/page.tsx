/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import { resetPassword } from '@/api/user/auth'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

function ForgotPassword (): React.ReactElement {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      router.push('/auth/login')
    }
  }, [token, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Error',
        duration: 4000,
        description: 'Passwords do not match.'
      })
      return
    }

    try {
      if (typeof token === 'string') {
        await resetPassword({ token, password: newPassword })
        toast({
          title: 'Success',
          duration: 3000,
          description: 'You have successfully reset your password.'
        })
        router.push('/auth/login')
      }
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
      <Card className="mx-auto max-w-sm bg-bg-200">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription>Enter and confirm your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                placeholder="Enter your new password"
                value={newPassword}
                id="newPassword"
                type="password"
                required
                onChange={(e) => {
                  setNewPassword(e.target.value)
                }}
              />
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                placeholder="Confirm your new password"
                value={confirmPassword}
                id="confirmPassword"
                type="password"
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              />
            </div>
            <Button className="w-full mt-6" type="submit">
              Update Password
            </Button>
            <div className="mt-3 text-center text-sm">
              Remember your password? {' '}
              <Link className="underline text-blue-500" href='/auth/login'>
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

export default ForgotPassword
