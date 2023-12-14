/* eslint-disable @typescript-eslint/no-misused-promises */
import { requestResetPassword } from '@/api/user/auth'
import { useState } from 'react'
import Link from 'next/link'

import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useToast } from '../ui/use-toast'

function DialogResetPassword (): React.ReactElement {
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      const { message } = await requestResetPassword(email)
      toast({
        title: 'Success',
        duration: 3000,
        description: message
      })
    } catch (error) {
      toast({
        title: 'Error',
        duration: 3000,
        description: (error as any)?.response?.data?.message ?? 'An error occurred. Please try again later.'
      })
    }
  }

  return (
    <DialogContent className='bg-bg-200'>
      <DialogHeader>
        <DialogTitle className='text-2xl text-left font-bold'>
          Reset Password
        </DialogTitle>
        <DialogDescription className='text-left'>Enter your email below to reset your password</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit}>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              placeholder='m@example.com'
              required
              value={email}
              type='email'
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <Button className='w-full' type='submit'>
            Submit
          </Button>
        </div>
      </form>
      <div className='text-center text-sm'>
        Remember your password? {' '}
        <Link className='underline text-blue-500' href='/auth/login'>
          Return to Login
        </Link>
      </div>
    </DialogContent>
  )
}

export default DialogResetPassword
