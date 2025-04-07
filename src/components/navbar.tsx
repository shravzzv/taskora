import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className='py-5 px-2 md:px-30'>
      <ul className='flex justify-between'>
        <div className='flex items-center gap-5'>
          <li>
            <Link href='/' className='font-bold text-lg'>
              taskora
            </Link>
          </li>
          <li>
            <Link href='#features'>Features</Link>
          </li>
        </div>

        <div className='flex items-center gap-5'>
          <li>
            <Link href='/login'>Log in</Link>
          </li>
          <li>
            <Link
              href='/signup'
              className='inline-block border-2 border-black-50 rounded-lg p-2 px-4'
            >
              Sign up
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  )
}
