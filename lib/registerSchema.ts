import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(3, { message: 'Please enter your name' }),
  lastName: z.string().min(3, { message: 'Please enter your last name' }),
  rut: z.string().min(9, { message: 'Please enter your rut' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string().min(6, { message: 'Please enter a password' })
})
