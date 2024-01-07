import { registerSchema } from '@/app/lib/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useRegisterForm = () => {
  return useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      lastName: '',
      rut: '',
      email: '',
      password: ''
    }
  })
}
