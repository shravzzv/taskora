import { z } from 'zod'

export const taskPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
})
