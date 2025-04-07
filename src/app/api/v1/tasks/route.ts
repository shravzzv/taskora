import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const tasks = await prisma.task.findMany()
  return NextResponse.json({ tasks })
}

export async function POST(req: NextRequest) {
  const { title, date } = await req.json()
  const newTask = await prisma.task.create({
    data: {
      title,
      date,
    },
  })
  return NextResponse.json({ newTask })
}
