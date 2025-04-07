import Navbar from '@/components/navbar'
import Image from 'next/image'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div>
      <Navbar />

      <section className='text-center sm:bg-[url(/bubbles.png)] sm:bg-no-repeat sm:bg-top sm:bg-contain'>
        <h1 className='text-4xl lg:text-6xl my-5 lg:my-10 font-bold md:font-black'>
          Tasks, just tasks.
        </h1>
        <p className='max-w-[250] lg:max-w-[300] mx-auto lg:mb-10'>
          Keep track of the daily tasks in life and get that satisfaction upon
          completion.
        </p>
        <div className='flex items-center justify-center gap-5 my-5 mb-0'>
          <Link
            href='/dashboard'
            className='px-6 py-2 rounded-md text-white font-medium bg-gradient-to-r from-pink-500 to-purple-500 hover:brightness-110 transition fw-bold'
          >
            Get Started
          </Link>

          <Link
            href='#features'
            className='px-6 py-2 rounded-md bg-gray-700 text-white font-medium hover:bg-gray-600 transition'
          >
            Learn More
          </Link>
        </div>

        <Image
          src='/windows.png'
          alt=''
          width={400}
          height={400}
          className='block mx-auto md:w-xl md:h-xl mt-[-35px]'
        />
      </section>

      <section className='mb-50'>
        <h2
          className='text-3xl lg:text-5xl my-5 lg:my-10 font-bold md:font-black text-center'
          id='features'
        >
          Features
        </h2>

        <ul className='md:text-center flex flex-col px-10 gap-5'>
          <li>
            <span className='mr-2'>✔️</span>Organize tasks with an intuitive and
            user-friendly interface.
          </li>
          <li>
            <span className='mr-2'>✔️</span>Set deadlines and receive timely
            reminders for your tasks.
          </li>
          <li>
            <span className='mr-2'>✔️</span>Track progress with visual
            indicators and completion stats.
          </li>
          <li>
            <span className='mr-2'>✔️</span>Collaborate with others by sharing
            tasks and assigning roles.
          </li>
          <li>
            <span className='mr-2'>✔️</span>Access your tasks seamlessly across
            multiple devices.
          </li>
        </ul>
      </section>
    </div>
  )
}
