/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/loginSchema'
import { useForm } from 'react-hook-form'

import type { z } from 'zod'

export const useLoginForm = () => {
  return useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
}
