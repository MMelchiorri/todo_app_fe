import { getTodoById } from '@/services/todosFetch'
import CreateTodoForm from '@/sections/todos/FormDataTodos'

export default async function Page({ params }: { params: { _id: string } }) {
  const { _id } = params
  const todo = await getTodoById(_id)

  return <CreateTodoForm todo={todo} />
}
