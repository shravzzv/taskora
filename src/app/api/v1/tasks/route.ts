import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { taskPostSchema } from '@/schemas/taskPostSchema'
import { handleError } from '@/utils/handleError'

export async function GET() {
  try {
    const tasks = await prisma.task.findMany()
    return NextResponse.json({ tasks })
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = taskPostSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ errors: result.error.errors }, { status: 400 })
    }
    const { title, date } = result.data
    const newTask = await prisma.task.create({
      data: {
        title,
        date,
      },
    })
    return NextResponse.json({ newTask })
  } catch (error) {
    return handleError(error)
  }
}
