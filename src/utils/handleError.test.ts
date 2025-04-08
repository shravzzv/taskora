import { handleError } from '@/utils/handleError'
import { NextResponse } from 'next/server'

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((body, init) => ({
      json: async () => body,
      status: init?.status ?? 200,
    })),
  },
}))

describe('handleError', () => {
  it('should return a 500 response with error message when given an Error object', async () => {
    const error = new Error('Something went wrong')
    const response = handleError(error)
    const json = await response.json()

    expect(response.status).toBe(500)
    expect(json).toEqual({
      error: 'An unexpected error occurred',
      message: 'Something went wrong',
    })
    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        error: 'An unexpected error occurred',
        message: 'Something went wrong',
      },
      { status: 500 }
    )
  })

  it('should return a 500 response with generic message if error is not an Error instance', async () => {
    const response = handleError('string error' as unknown)
    const json = await response.json()

    expect(response.status).toBe(500)
    expect(json).toEqual({
      error: 'An unexpected error occurred',
      message: 'Unknown error',
    })
    expect(NextResponse.json).toHaveBeenCalledWith(
      {
        error: 'An unexpected error occurred',
        message: 'Unknown error',
      },
      { status: 500 }
    )
  })
})
