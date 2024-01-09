/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { loginStudentSchema } from '../lib/loginStudentSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import type { z } from 'zod'

export const useLoginStudentForm = () => {
  return useForm<z.infer<typeof loginStudentSchema>>({
    resolver: zodResolver(loginStudentSchema),
    defaultValues: {
      rut: '',
      password: ''
    }
  })
}
