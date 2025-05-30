import { Todo } from '@/type/Todo';

export async function fetchTodos(): Promise<Todo[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_TODO_API_BASE_URL}/todos`, {
            cache: 'no-store'
        });
        const data: Todo[] = await res.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error fetching todos:", error);
        return [];
    }
}
