import { loginSchema } from '@/lib/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useLoginForm = () => {
  return useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
}
