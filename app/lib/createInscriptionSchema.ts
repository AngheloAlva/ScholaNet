import { z } from 'zod'

const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]$/

export const createInscriptionSchema = z.object({
  name: z.string().min(3, { message: 'Name is required' }),
  lastName: z.string().min(3, { message: 'Last name is required' }),
  dateOfBirth: z.date().min(new Date(2000, 1, 1), { message: 'Date of birth is required' }),
  password: z.string().min(4, { message: 'Password is required' }).max(4),
  rut: z.string().regex(rutRegex, { message: 'Rut is required' }),
  program: z.string().min(5, { message: 'Program is required' })
})
