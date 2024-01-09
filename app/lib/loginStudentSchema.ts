import { z } from 'zod'

const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]$/

export const loginStudentSchema = z.object({
  rut: z.string().regex(rutRegex, { message: 'Rut is required' }),
  password: z.string().min(1, { message: 'Please enter a password' })
})
