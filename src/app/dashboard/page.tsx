import Todo from '@/components/todo'

interface Todo {
  id: string
  title: string
  date: string
}

export default function Page() {
  const todos: Todo[] = [
    { id: '1', title: 'Buy groceries', date: '2025-04-07T09:00:00' },
    { id: '2', title: 'Call mom', date: '2025-04-08T10:30:00' },
    { id: '3', title: 'Finish project report', date: '2025-04-09T14:00:00' },
    {
      id: '4',
      title: 'Schedule dentist appointment',
      date: '2025-04-10T16:00:00',
    },
    { id: '5', title: 'Workout', date: '2025-04-11T07:00:00' },
    { id: '6', title: 'Read a book', date: '2025-04-06T20:00:00' },
    { id: '7', title: 'Plan weekend trip', date: '2025-04-13T11:00:00' },
    { id: '8', title: 'Clean the house', date: '2025-04-14T15:30:00' },
    { id: '9', title: 'Prepare presentation', date: '2025-04-01T09:45:00' },
    { id: '10', title: 'Attend team meeting', date: '2025-04-16T13:00:00' },
  ]

  return (
    <div className='py-10 px-5'>
      <p>Dashboard</p>
      <h1 className='text-3xl font-bold'>Good morning</h1>

      <section className='grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4 py-5'>
        {todos.map((todo) => (
          <Todo key={todo.id} title={todo.title} date={todo.date} />
        ))}
      </section>
    </div>
  )
}
