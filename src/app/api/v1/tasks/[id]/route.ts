import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { taskUpdateSchema } from '@/schemas/taskUpdateSchema'
import { handleError } from '@/utils/handleError'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const task = await prisma.task.findUnique({
      where: { id },
    })
    if (!task) {
      return NextResponse.json(
        { message: `Task with id ${id} not found!` },
        { status: 404 }
      )
    }
    return NextResponse.json({ task })
  } catch (error) {
    return handleError(error)
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const task = await prisma.task.findUnique({
      where: { id },
    })
    if (!task) {
      return NextResponse.json(
        { message: `Task with id ${id} not found!` },
        { status: 404 }
      )
    }
    const body = await req.json()
    const result = taskUpdateSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ errors: result.error.errors }, { status: 400 })
    }
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { ...result.data },
    })
    return NextResponse.json({ updatedTask })
  } catch (error) {
    return handleError(error)
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const task = await prisma.task.findUnique({
      where: { id },
    })
    if (!task) {
      return NextResponse.json(
        { message: `Task with id ${id} not found!` },
        { status: 404 }
      )
    }
    await prisma.task.delete({ where: { id } })
    return NextResponse.json({
      message: `Task with id ${id} successfully deleted.`,
    })
  } catch (error) {
    return handleError(error)
  }
}
