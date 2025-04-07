'use client'
import { FC, useState } from 'react'
import getRelativeDate from '@/utils/getRelativeDate'

interface TodoParams {
  title: string
  date: string
}

const Todo: FC<TodoParams> = ({ title, date }) => {
  const [checked, setChecked] = useState(false)

  return (
    <div className='flex gap-2 p-4 bg-purple-100 rounded-lg dark:text-black'>
      <div
        className={`w-6 h-6 rounded-md border-1 border-purple-500 ${
          checked && 'bg-purple-300'
        }`}
        onClick={() => setChecked(!checked)}
      />

      <div className='flex flex-col'>
        <p className={`${checked && 'line-through'}`}>{title}</p>
        <p className='text-sm text-red-500'>{getRelativeDate(date)}</p>
      </div>
    </div>
  )
}

export default Todo
