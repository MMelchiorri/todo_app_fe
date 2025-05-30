import { fetchTodos } from "@/services/todoFetch";
import { Todo } from "@/type/Todo";
import TodoTable from "@/sections/todos/tableDataTodos";
import TableEmpty from "@/sections/todos/tableDataEmpty";


export default async function TodoPage() {

    const todos: Todo[] = await fetchTodos();
    console.log(todos)

    if (!todos || todos.length === 0) {
        return <TableEmpty/>;
    }

    return (
        <TodoTable todos={todos} />
    );
}
