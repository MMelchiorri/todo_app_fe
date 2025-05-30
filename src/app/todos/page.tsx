import { fetchTodos } from "@/services/todoFetch";
import { Todo } from "@/type/Todo";
import {
    Table,
    TableContainer,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import {getTranslations} from "next-intl/server";

export default async function TodoPage() {

    const todos: Todo[] = await fetchTodos();
    const excludedKeys = ['_id', '__v', 'properties'];
    const keys = Object.keys(todos[0]).filter(
        (key) => !excludedKeys.includes(key)
    ) as (keyof Todo)[];    const t= await getTranslations('Todos');

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {keys.map((key) => (
                            <TableCell key={key}>{t(`columns.${key}`)}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {todos.map((todo) => (
                        <TableRow key={todo.id}>
                            {keys.map((key) => (
                                <TableCell key={key}>
                                    {todo[key] instanceof Date
                                        ? todo[key].toISOString().split("T")[0]
                                        : todo[key]?.toString() ?? "N/A"}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
