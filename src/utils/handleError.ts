import { NextResponse } from 'next/server'

export const handleError = (error: unknown) => {
  return NextResponse.json(
    {
      error: 'An unexpected error occurred',
      message: error instanceof Error ? error.message : 'Unknown error',
    },
    { status: 500 }
  )
}
