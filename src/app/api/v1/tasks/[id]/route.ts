import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
  const { title, date } = await req.json()
  const updatedTask = await prisma.task.update({
    where: { id },
    data: { title, date },
  })
  return NextResponse.json({ updatedTask })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
}
