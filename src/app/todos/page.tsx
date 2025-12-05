import TodoTable from '@/sections/todos/tableDataTodos'

export default async function TodoPage() {
  return (
    <TodoTable url={`${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/todos`} />
  )
}
