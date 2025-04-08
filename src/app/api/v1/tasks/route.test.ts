/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET, POST } from '@/app/api/v1/tasks/route'
import prisma from '@/lib/prisma'
import { taskPostSchema } from '@/schemas/taskPostSchema'

jest.mock('@/lib/prisma', () => ({
  task: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
}))

jest.mock('@/schemas/taskPostSchema', () => ({
  taskPostSchema: {
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

describe('API Routes - Tasks', () => {
  describe('GET /tasks', () => {
    it('should return a list of tasks', async () => {
      const mockTasks = [{ id: 1, title: 'Task 1', date: '2023-01-01' }]
      ;(prisma.task.findMany as jest.Mock).mockResolvedValue(mockTasks)

      const response = await GET()
      const json = await response.json()

      expect(prisma.task.findMany).toHaveBeenCalledTimes(1)
      expect(json).toEqual({ tasks: mockTasks })
    })

    it('should handle errors gracefully', async () => {
      ;(prisma.task.findMany as jest.Mock).mockRejectedValue(
        new Error('Database error')
      )

      const response = await GET()
      const json = await response.json()

      expect(response.status).toBe(500)
      expect(json.error).toBe('An unexpected error occurred')
    })
  })

  describe('POST /tasks', () => {
    it('should create a new task with valid data', async () => {
      const mockTaskInput = { title: 'New Task', date: '2023-01-01' }
      const mockTask = { id: 1, ...mockTaskInput }

      ;(taskPostSchema.safeParse as jest.Mock).mockReturnValue({
        success: true,
        data: mockTaskInput,
      })
      ;(prisma.task.create as jest.Mock).mockResolvedValue(mockTask)

      const mockRequest = {
        json: async () => mockTaskInput,
      } as any

      const response = await POST(mockRequest)
      const json = await response.json()

      expect(prisma.task.create).toHaveBeenCalledWith({
        data: mockTaskInput,
      })
      expect(response.status).toBe(200)
      expect(json.newTask).toEqual(mockTask)
    })

    it('should return 400 for invalid data', async () => {
      const mockErrors = [{ message: 'Title is required' }]

      ;(taskPostSchema.safeParse as jest.Mock).mockReturnValue({
        success: false,
        error: { errors: mockErrors },
      })

      const mockRequest = {
        json: async () => ({}),
      } as any

      const response = await POST(mockRequest)
      const json = await response.json()

      expect(response.status).toBe(400)
      expect(json.errors).toEqual(mockErrors)
    })

    it('should handle errors during creation', async () => {
      const validData = { title: 'Err Task', date: '2023-01-01' }

      ;(taskPostSchema.safeParse as jest.Mock).mockReturnValue({
        success: true,
        data: validData,
      })
      ;(prisma.task.create as jest.Mock).mockRejectedValue(
        new Error('DB write fail')
      )

      const mockRequest = {
        json: async () => validData,
      } as any

      const response = await POST(mockRequest)
      const json = await response.json()

      expect(response.status).toBe(500)
      expect(json.error).toBe('An unexpected error occurred')
    })
  })
})
