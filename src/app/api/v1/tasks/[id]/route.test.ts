/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET, PUT, DELETE } from '@/app/api/v1/tasks/[id]/route'
import prisma from '@/lib/prisma'
import { taskUpdateSchema } from '@/schemas/taskUpdateSchema'

jest.mock('@/lib/prisma', () => ({
  task: {
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}))

jest.mock('@/schemas/taskUpdateSchema', () => ({
  taskUpdateSchema: {
    safeParse: jest.fn(),
  },
}))

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body, init) => ({
      json: async () => body,
      status: init?.status ?? 200,
    })),
  },
}))

describe('API Routes - Task by ID', () => {
  const params = Promise.resolve({ id: '1' })

  describe('GET /tasks/:id', () => {
    it('returns task when found', async () => {
      const mockTask = { id: '1', title: 'Task', date: '2023-01-01' }
      ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask)

      const res = await GET({} as any, { params })
      const json = await res.json()

      expect(json.task).toEqual(mockTask)
    })

    it('returns 404 if task not found', async () => {
      ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(null)

      const res = await GET({} as any, { params })
      const json = await res.json()

      expect(res.status).toBe(404)
      expect(json.message).toMatch(/not found/)
    })

    it('should handle errors in GET route', async () => {
      const mockParams = Promise.resolve({ id: '123' })
      ;(prisma.task.findUnique as jest.Mock).mockRejectedValue(
        new Error('DB fail')
      )

      const response = await GET({} as any, { params: mockParams })
      const json = await response.json()

      expect(response.status).toBe(500)
      expect(json.error).toBe('An unexpected error occurred')
    })
  })

  describe('PUT /tasks/:id', () => {
    const mockInput = { title: 'Updated', date: '2024-01-01' }
    const mockUpdatedTask = { id: '1', ...mockInput }

    it('updates task when valid', async () => {
      ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(mockUpdatedTask)
      ;(taskUpdateSchema.safeParse as jest.Mock).mockReturnValue({
        success: true,
        data: mockInput,
      })
      ;(prisma.task.update as jest.Mock).mockResolvedValue(mockUpdatedTask)

      const req = { json: async () => mockInput } as any
      const res = await PUT(req, { params })
      const json = await res.json()

      expect(res.status).toBe(200)
      expect(json.updatedTask).toEqual(mockUpdatedTask)
    })

    it('returns 400 when validation fails', async () => {
      const mockErrors = [{ message: 'Invalid input' }]
      ;(prisma.task.findUnique as jest.Mock).mockResolvedValue({})
      ;(taskUpdateSchema.safeParse as jest.Mock).mockReturnValue({
        success: false,
        error: { errors: mockErrors },
      })

      const req = { json: async () => ({}) } as any
      const res = await PUT(req, { params })
      const json = await res.json()

      expect(res.status).toBe(400)
      expect(json.errors).toEqual(mockErrors)
    })

    it('returns 404 if task not found before update', async () => {
      ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(null)

      const req = { json: async () => mockInput } as any
      const res = await PUT(req, { params })
      const json = await res.json()

      expect(res.status).toBe(404)
      expect(json.message).toMatch(/not found/)
    })

    it('should handle errors in PUT route', async () => {
      const mockParams = Promise.resolve({ id: '123' })
      ;(prisma.task.findUnique as jest.Mock).mockResolvedValue({}) // Valid task
      ;(taskUpdateSchema.safeParse as jest.Mock).mockReturnValue({
        success: true,
        data: { title: 'Updated' },
      })
      ;(prisma.task.update as jest.Mock).mockRejectedValue(
        new Error('Update fail')
      )

      const mockReq = { json: async () => ({ title: 'Updated' }) } as any
      const response = await PUT(mockReq, { params: mockParams })
      const json = await response.json()

      expect(response.status).toBe(500)
      expect(json.error).toBe('An unexpected error occurred')
    })
  })

  describe('DELETE /tasks/:id', () => {
    it('deletes task when found', async () => {
      ;(prisma.task.findUnique as jest.Mock).mockResolvedValue({ id: '1' })
      ;(prisma.task.delete as jest.Mock).mockResolvedValue({})

      const res = await DELETE({} as any, { params })
      const json = await res.json()

      expect(res.status).toBe(200)
      expect(json.message).toMatch(/successfully deleted/)
    })

    it('returns 404 if task not found before delete', async () => {
      ;(prisma.task.findUnique as jest.Mock).mockResolvedValue(null)

      const res = await DELETE({} as any, { params })
      const json = await res.json()

      expect(res.status).toBe(404)
      expect(json.message).toMatch(/not found/)
    })

    it('should handle errors in DELETE route', async () => {
      const mockParams = Promise.resolve({ id: '123' })
      ;(prisma.task.findUnique as jest.Mock).mockResolvedValue({}) // Valid task
      ;(prisma.task.delete as jest.Mock).mockRejectedValue(
        new Error('Delete fail')
      )

      const response = await DELETE({} as any, { params: mockParams })
      const json = await response.json()

      expect(response.status).toBe(500)
      expect(json.error).toBe('An unexpected error occurred')
    })
  })
})
