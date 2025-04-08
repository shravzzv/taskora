import { z } from 'zod'

export const taskUpdateSchema = z
  .object({
    title: z.string().min(1, 'Title is required').optional(),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), 'Invalid date format')
      .optional(),
  })
  .refine((data) => data.title !== undefined || data.date !== undefined, {
    message: 'At least one field (title or date) must be provided',
    path: [],
  })
