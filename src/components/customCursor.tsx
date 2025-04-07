'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  return (
    <div
      className='pointer-events-none fixed z-[9999] h-6 w-6 rounded-full sm:bg-transparent lg:bg-amber-400 dark:bg-white transition-transform duration-75 ease-out'
      style={{
        transform: `translate(${position.x - 12}px, ${position.y - 12}px)`,
      }}
    />
  )
}
