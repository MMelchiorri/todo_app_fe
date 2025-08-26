import { getTodoById } from '@/services/todosFetch'
import UpdateDataTodos from '@/sections/todos/updateDataTodos'

export default async function Page({ params }: { params: { _id: string } }) {
  const { _id } = params
  const todo = await getTodoById(_id)

  return <UpdateDataTodos todo={todo} />
}
